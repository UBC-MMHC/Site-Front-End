const config = {
  // Format all supported files with Prettier
  "*.{ts,tsx,js,jsx,json,md,css,yml,yaml}": ["prettier --write"],

  // Lint TypeScript and JavaScript files with ESLint
  "*.{ts,tsx,js,jsx}": ["eslint --fix"],
};

export default config;
