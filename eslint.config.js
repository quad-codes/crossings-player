import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js"

export default [
	{
		rules: {
			"no-undef": "off", // TODO: check
			// "@typescript-eslint/no-var-requires": "off", // TODO: check
			// "@typescript-eslint/no-unused-vars": "off", // TODO: check

			// "import/order": "error",
		},
	},
]
