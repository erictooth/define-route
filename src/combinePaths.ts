export const combinePaths = (path: string, basePath: string): URL => {
	const baseUrl = new URL(basePath, window.location.origin);

	const url = new URL(path, baseUrl);
	baseUrl.searchParams.forEach((value, key) => {
		url.searchParams.set(key, value);
	});

	return url;
};
