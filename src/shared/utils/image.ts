/** SVGs skip the image optimizer, which only rasterizes formats it trusts. */
export function isSvgSource(src: unknown) {
	return typeof src === "string" && /\.svg(?:$|[?#])/i.test(src);
}
