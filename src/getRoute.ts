import { paramProxy } from "./paramProxy";
import type { CreatePathnameFn } from "./CreatePathnameFn.type";

export const getRoute = <P, S extends string>(
	createPathname: CreatePathnameFn<P, S>
) => {
	const url = new URL(createPathname(paramProxy as P), window.location.origin);
	return url.pathname;
};
