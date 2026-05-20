import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./packages/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "var(--color-primary, #2563eb)",
				secondary: "var(--color-secondary, #ffffff)",
				"primary-bg": "var(--color-primary-bg, #16345a)",
				"secondary-bg": "var(--color-secondary-bg, #ffffff)",
			},
		},
	},
	plugins: [],
};

export default config;
