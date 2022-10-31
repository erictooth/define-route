import { defineRoute } from "../defineRoute";

const testParams = {
	paramA: "1234",
	paramB: "4567",
};

const testConfig = (params: typeof testParams) =>
	`/base/sub/${params.paramA}/${params.paramB}?query=8910#hash`;

it("templates route property correctly", () => {
	// Query and hash should be dropped, and paramProxy should properly template the params
	expect(defineRoute(testConfig).route()).toEqual("/base/sub/:paramA/:paramB");
});

it("extends a base route properly", () => {
	const route = defineRoute(testConfig).extend(
		(params: { paramC: string }) => `/extended/${params.paramC}`
	);

	expect(route.link({ ...testParams, paramC: "1121" })).toEqual(
		`/base/sub/${testParams.paramA}/${testParams.paramB}/extended/1121?query=8910`
	);
});

it("handles URI encoded paths", () => {
	const route = defineRoute(
		(params: { projectName: string }) =>
			`/project/${encodeURIComponent(params.projectName)}`
	);

	expect(
		route.link({
			...testParams,
			projectName: "/projectNameExample/test/folder1",
		})
	).toEqual(`/project/%2FprojectNameExample%2Ftest%2Ffolder1`);

	expect(route.fullRoute()).toEqual(`/project/:projectName`);
});
