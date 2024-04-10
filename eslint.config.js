import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js"

export default [
	// { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	// pluginJs.configs.recommended,
	// ...tseslint.configs.recommended,
	// pluginReactConfig,
	{
		rules: {
			"no-undef": "off", // TODO: check
			// "@typescript-eslint/no-var-requires": "off", // TODO: check
			// "@typescript-eslint/no-unused-vars": "off", // TODO: check

			// "import/order": "error",
		},
	},
]

// @ts-check

// 	root: true,

// 	plugins: ["@typescript-eslint", "import"],
// 	extends: [
// 		"eslint:recommended",
// 		"plugin:@typescript-eslint/recommended",
// 		"plugin:import/recommended",
// 		"plugin:import/typescript",
// 	],
// 	parser: "@typescript-eslint/parser",
// 	settings: {
// 		"import/extensions": [".ts", ".tsx"],
// 		"import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
// 		"import/resolver": {
// 			typescript: { project: "<root>/tsconfig.json" },
// 		},
// 	},
