// @ts-check

module.exports = {
	root: true,

	plugins: ["@typescript-eslint", "import"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:import/recommended",
		"plugin:import/typescript",
	],
	parser: "@typescript-eslint/parser",
	settings: {
		"import/extensions": [".ts", ".tsx"],
		"import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
		"import/resolver": {
			typescript: { project: "<root>/tsconfig.json" },
		},
	},

	rules: {
		"no-undef": "off", // TODO: check
		"@typescript-eslint/no-var-requires": "off", // TODO: check
		"@typescript-eslint/no-unused-vars": "off", // TODO: check

		"import/order": "error",
	},
}
