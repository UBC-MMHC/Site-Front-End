import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";
import "eslint-plugin-only-warn";

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	// Prettier config must come last to disable conflicting ESLint rules
	prettierConfig,
	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		".next/**",
		"out/**",
		"build/**",
	  // test format check
		"next-env.d.ts",
		"node_modules/**",
	]),
	{
		rules: {
			// Customize rules as needed
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
				},
			],
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-unused-expressions": "warn",
			"@typescript-eslint/ban-ts-comment": "warn",
			"@typescript-eslint/ban-tslint-comment": "warn",
			"@typescript-eslint/consistent-indexed-object-style": "warn",
			"@typescript-eslint/consistent-type-definitions": "warn",
			"@typescript-eslint/consistent-type-imports": "warn",
			"@typescript-eslint/consistent-type-imports": "warn",
		},
	},
]);

export default eslintConfig;
