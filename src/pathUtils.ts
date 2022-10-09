export const addTrailingSlash = (s: string): string =>
	s.charAt(s.length - 1) === "/" ? s : s + "/";

export const removeLeadingSlash = (s: string): string =>
	s.charAt(0) === "/" ? s.slice(1) : s;
