import { paramProxy } from "./paramProxy.ts";
import type { CreatePathnameFn } from "./CreatePathnameFn.type.ts";

export const getRoute = <P, S extends string>(
	createPathname: CreatePathnameFn<P, S>
) => {
	const url = new URL(
		createPathname(paramProxy as P),
		globalThis.location.origin
	);
	return url.pathname;
};
