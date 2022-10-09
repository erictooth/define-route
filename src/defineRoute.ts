import { combinePaths } from "./combinePaths";
import type { CreatePathnameFn } from "./CreatePathnameFn.type";
import { getRoute } from "./getRoute";

const defineRouteWithBase =
	<BaseParams, BasePath extends string>(
		createBasePathname: CreatePathnameFn<BaseParams, BasePath>
	) =>
	<Params, Path extends string>(
		createPathname: CreatePathnameFn<Params, Path>
	) => {
		type CombinedParams = Params & BaseParams;

		const getUrl = (params: CombinedParams): URL =>
			combinePaths(createPathname(params), createBasePathname(params));

		return Object.assign(getUrl, {
			extend: defineRouteWithBase(
				(params: CombinedParams) => getUrl(params).href
			),
			link: (params: CombinedParams) =>
				getUrl(params).href.replace(window.location.origin, ""),
			fullRoute: getRoute((params: CombinedParams) => getUrl(params).href),
			route: getRoute(createPathname),
		});
	};

export const defineRoute = defineRouteWithBase(() => window.location.origin);
