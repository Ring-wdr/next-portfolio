import { revalidateTag } from "next/cache";
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

	return Response.json({ ok: true, tag: PROJECTS_CACHE_TAG });
}
