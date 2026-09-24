// Publishes portfolio content to Vercel Blob and revalidates the site, so
// content changes ship without a rebuild.
//
//   pnpm content:publish              # upload + revalidate
//   pnpm content:publish --dry-run    # validate only
//   pnpm content:publish --dir ../my-content --site https://example.com
//
// Env (.env.content.local, then .env.local):
//   upload     BLOB_STORE_ID + VERCEL_OIDC_TOKEN, or BLOB_READ_WRITE_TOKEN
//              `vercel env pull .env.content.local` — kept out of .env.local so
//              `next dev` keeps previewing content/ before it is published.
//              The store must be connected to the Development environment.
//   revalidate CONTENT_SITE_URL (or --site) + CONTENT_REVALIDATE_SECRET
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";
import { BlobNotFoundError, del, head, list, put } from "@vercel/blob";
import {
	IMAGE_BLOB_PREFIX,
	MANIFEST_BLOB_PREFIX,
	isAbsoluteUrl,
	projectManifestSchema,
	type ProjectManifest,
} from "../../src/shared/content/project-schema.ts";

const IMMUTABLE_MAX_AGE = 60 * 60 * 24 * 365;

const CONTENT_TYPES: Record<string, string> = {
	".avif": "image/avif",
	".gif": "image/gif",
	".jpeg": "image/jpeg",
	".jpg": "image/jpeg",
	".png": "image/png",
	".svg": "image/svg+xml",
	".webp": "image/webp",
};

const { values: args } = parseArgs({
	options: {
		dir: { type: "string", default: "content" },
		site: { type: "string", default: process.env.CONTENT_SITE_URL },
		keep: { type: "string", default: "10" },
		"dry-run": { type: "boolean", default: false },
	},
});

const contentDir = path.resolve(args.dir);
const dryRun = args["dry-run"];

async function readManifest(): Promise<ProjectManifest> {
	const raw = JSON.parse(
		await readFile(path.join(contentDir, "projects.json"), "utf8"),
	);
	const result = projectManifestSchema.safeParse(raw);
	if (!result.success) {
		console.error("projects.json does not match the schema:");
		for (const issue of result.error.issues) {
			console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
		}
		process.exit(1);
	}
	return result.data;
}

function resolveImagePath(ref: string) {
	const filePath = path.resolve(contentDir, ref);
	if (!filePath.startsWith(contentDir + path.sep)) {
		throw new Error(`Image path escapes the content directory: ${ref}`);
	}
	const contentType = CONTENT_TYPES[path.extname(filePath).toLowerCase()];
	if (!contentType) {
		throw new Error(`Unsupported image type: ${ref}`);
	}
	return { filePath, contentType };
}

async function findBlobUrl(pathname: string) {
	try {
		return (await head(pathname)).url;
	} catch (error) {
		if (error instanceof BlobNotFoundError) return null;
		throw error;
	}
}

/** Uploads a local image under a content-hashed pathname and returns its URL. */
async function uploadImage(ref: string): Promise<string> {
	const { filePath, contentType } = resolveImagePath(ref);
	const file = await readFile(filePath);
	const hash = createHash("sha256").update(file).digest("hex").slice(0, 12);
	const { name, ext } = path.parse(filePath);
	const pathname = `${IMAGE_BLOB_PREFIX}${name}.${hash}${ext.toLowerCase()}`;

	if (dryRun) return `(dry-run)/${pathname}`;

	const existing = await findBlobUrl(pathname);
	if (existing) return existing;

	const { url } = await put(pathname, file, {
		access: "public",
		addRandomSuffix: false,
		allowOverwrite: true,
		cacheControlMaxAge: IMMUTABLE_MAX_AGE,
		contentType,
	});
	console.log(`  ↑ ${ref} → ${pathname}`);
	return url;
}

async function resolveImages(manifest: ProjectManifest): Promise<ProjectManifest> {
	const uploads = new Map<string, Promise<string>>();
	const resolve = (ref: string) => {
		if (isAbsoluteUrl(ref)) return Promise.resolve(ref);
		if (!uploads.has(ref)) uploads.set(ref, uploadImage(ref));
		return uploads.get(ref)!;
	};

	const projects = await Promise.all(
		manifest.projects.map(async (project) => ({
			...project,
			thumbnail: await resolve(project.thumbnail),
			gallery: await Promise.all(
				project.gallery.map(async (image) => ({
					...image,
					src: await resolve(image.src),
				})),
			),
		})),
	);

	return { projects };
}

async function pruneManifests(keep: number) {
	const { blobs } = await list({ prefix: MANIFEST_BLOB_PREFIX });
	const stale = blobs
		.toSorted((a, b) => b.pathname.localeCompare(a.pathname))
		.slice(keep);
	if (stale.length > 0) {
		await del(stale.map((blob) => blob.url));
		console.log(`Pruned ${stale.length} old manifest(s).`);
	}
}

async function revalidate() {
	const secret = process.env.CONTENT_REVALIDATE_SECRET;
	if (!args.site || !secret) {
		console.warn(
			"Skipped revalidation: set CONTENT_SITE_URL (or --site) and CONTENT_REVALIDATE_SECRET. The site picks up the new manifest within 24h.",
		);
		return;
	}

	const url = new URL("/api/revalidate", args.site);
	const response = await fetch(url, {
		method: "POST",
		headers: { authorization: `Bearer ${secret}` },
	});
	if (!response.ok) {
		throw new Error(
			`Revalidation failed (${response.status}): ${await response.text()}`,
		);
	}
	console.log(`Revalidated ${url.origin}.`);
}

async function main() {
	const manifest = await readManifest();
	console.log(`Validated ${manifest.projects.length} project(s) in ${contentDir}.`);

	const hasBlobCredentials =
		process.env.BLOB_READ_WRITE_TOKEN ||
		(process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN);
	if (!dryRun && !hasBlobCredentials) {
		console.error(
			"Blob credentials are missing. Run `vercel env pull .env.content.local` first.",
		);
		process.exit(1);
	}

	const published = projectManifestSchema.parse(await resolveImages(manifest));
	if (dryRun) {
		console.log("Dry run: all image references resolve. Nothing uploaded.");
		return;
	}

	// Timestamped, never overwritten: the site lists the prefix and reads the
	// newest one, so the Blob CDN cache can't serve an outdated manifest.
	const stamp = new Date().toISOString().replace(/[:.]/g, "-");
	const { pathname } = await put(
		`${MANIFEST_BLOB_PREFIX}${stamp}.json`,
		JSON.stringify(published),
		{
			access: "public",
			addRandomSuffix: false,
			cacheControlMaxAge: IMMUTABLE_MAX_AGE,
			contentType: "application/json",
		},
	);
	console.log(`Published ${pathname}.`);

	await pruneManifests(Math.max(1, Number.parseInt(args.keep, 10) || 10));
	await revalidate();
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
