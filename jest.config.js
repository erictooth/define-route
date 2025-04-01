export default {
	collectCoverage: true,
	collectCoverageFrom: ["src/**/*.ts"],
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.(t|j)s?$": ["@swc/jest"],
	},
};
