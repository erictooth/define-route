export default {
	collectCoverage: true,
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.(t|j)s?$": ["@swc/jest"],
	},
};
