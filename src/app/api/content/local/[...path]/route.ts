import { readFile } from "node:fs/promises";
import path from "node:path";

// Serves content/images/** for projects loaded from the local content source.
// Published projects point at Blob URLs instead.
const IMAGE_ROOT = path.join(process.cwd(), "content", "images");

const CONTENT_TYPES: Record<string, string> = {
	".avif": "image/avif",
	".gif": "image/gif",
	".jpeg": "image/jpeg",
	".jpg": "image/jpeg",
	".png": "image/png",
	".svg": "image/svg+xml",
	".webp": "image/webp",
};

export async function GET(
	_request: Request,
	{ params }: RouteContext<"/api/content/local/[...path]">,
) {
	const segments = (await params).path;
	if (segments[0] !== "images") {
		return new Response("Not found", { status: 404 });
	}

	const filePath = path.resolve(IMAGE_ROOT, ...segments.slice(1));
	const contentType = CONTENT_TYPES[path.extname(filePath).toLowerCase()];
	if (!filePath.startsWith(IMAGE_ROOT + path.sep) || !contentType) {
		return new Response("Not found", { status: 404 });
	}

	try {
		const file = await readFile(filePath);
		return new Response(file, {
			headers: {
				"Content-Type": contentType,
				"Cache-Control": "public, max-age=3600",
			},
		});
	} catch {
		return new Response("Not found", { status: 404 });
	}
}
