import { combinePaths } from "../combinePaths";

const testPaths: [paths: [base: string, sub: string], expected: string][] = [
	// adds leading and trailing slash to basepath
	[["basepath", "subpath"], "/basepath/subpath"],

	// drops leading slash on subpath
	[["/basepath/", "/subpath"], "/basepath/subpath"],

	// preserves trailing slash on subpath
	[["/basepath/", "subpath/"], "/basepath/subpath/"],
];

it("matches testPaths results", () => {
	testPaths.forEach((testConfig) => {
		const [paths, expected] = testConfig;
		expect(combinePaths(paths[1], paths[0]).pathname).toEqual(expected);
	});
});

it("preserves search params from both subpath and basepath", () => {
	expect(
		combinePaths("subpath?subParam=1", "/basepath/?baseParam=2").search
	).toEqual("?subParam=1&baseParam=2");
});

it("preserves the hash from only the subpath", () => {
	expect(
		combinePaths("subpath?subParam=1#testHash", "/basepath#ignoredHash").hash
	).toEqual("#testHash");
});
