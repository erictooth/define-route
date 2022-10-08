export const paramProxy: unknown = new Proxy(
	{},
	{
		get(_target, prop) {
			return `:${String(prop)}`;
		},
	}
);
