export const PARAM_IDENTIFIER = "__INTERNAL_PARAM_IDENTIFIER__";

export const paramProxy: unknown = new Proxy(
	{},
	{
		get(_target, prop) {
			return `${PARAM_IDENTIFIER}${String(prop)}`;
		},
	}
);
