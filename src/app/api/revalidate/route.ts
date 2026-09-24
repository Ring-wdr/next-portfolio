import { revalidatePath, revalidateTag } from "next/cache";
import { env } from "@/env";
import { PROJECTS_CACHE_TAG } from "@/shared/content/project-schema";

// Called by the Ring-wdr/portfolio-content publish workflow after it uploads
// a new manifest.
export async function POST(request: Request) {
	const secret = env.CONTENT_REVALIDATE_SECRET;
	if (!secret) {
		return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
	}

	if (request.headers.get("authorization") !== `Bearer ${secret}`) {
		return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
	}

	// Expire immediately so the next visit renders the new manifest instead of
	// serving the previous one while revalidating.
	revalidateTag(PROJECTS_CACHE_TAG, { expire: 0 });
	// On Vercel the prerendered sitemap isn't purged by the tag above (it is
	// under `next start`), so new or removed slugs would wait for its 1-day
	// revalidation. Purge it by path as well.
	revalidatePath("/sitemap.xml");

	return Response.json({ ok: true, tag: PROJECTS_CACHE_TAG });
}
