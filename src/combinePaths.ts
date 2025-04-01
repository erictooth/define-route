import { addTrailingSlash, removeLeadingSlash } from "./pathUtils.ts";

export const combinePaths = (path: string, basePath: string): URL => {
	const baseUrl = new URL(basePath, window.location.origin);

	baseUrl.pathname = addTrailingSlash(baseUrl.pathname);

	const url = new URL(removeLeadingSlash(path), baseUrl);

	baseUrl.searchParams.forEach((value, key) => {
		url.searchParams.set(key, value);
	});

	return url;
};
