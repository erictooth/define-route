import { combinePaths } from "./combinePaths.ts";
import type { CreatePathnameFn } from "./CreatePathnameFn.type.ts";
import { getRoute } from "./getRoute.ts";
import { PARAM_IDENTIFIER } from "./paramProxy.ts";

const paramRegex = new RegExp(PARAM_IDENTIFIER, "g");
const paramPlaceholder = ":";

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
			fullRoute: () =>
				getRoute((params: CombinedParams) => getUrl(params).href).replace(
					paramRegex,
					paramPlaceholder
				),
			route: () =>
				getRoute(createPathname).replace(paramRegex, paramPlaceholder),
		});
	};

export const defineRoute = defineRouteWithBase(() => window.location.origin);
