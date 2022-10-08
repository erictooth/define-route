import { combinePaths } from "../combinePaths";

it("merges two simple paths correctly", () => {
	expect(combinePaths("subpath", "/basepath/").pathname).toEqual(
		"/basepath/subpath"
	);
});

it("drops the basepath if subpath has a leading slash", () => {
	expect(combinePaths("/subpath", "/basepath/").pathname).toEqual("/subpath");
});

it("preserves search params from both subpath and basepath", () => {
	expect(
		combinePaths("subpath?subParam=1", "/basepath/?baseParam=2").search
	).toEqual("?subParam=1&baseParam=2");
});
