# MMHC Site Front-End

Hosted at https://ubcmmhc.com/

Interacting with https://github.com/UBC-MMHC/Site-Back-End

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
npm install
```

This command installs all dependencies **and** automatically sets up the pre-commit hooks via Husky.

### Development

```bash
npm run dev
```

## Code Quality

This project uses **automatic formatting and linting** via pre-commit hooks.

### What Happens Automatically

When you commit code, the following runs automatically on staged files:

1. **Prettier** formats your code (`.ts`, `.tsx`, `.js`, `.jsx`, `.json`, `.md`, `.css`, `.yml`, `.yaml`)
2. **ESLint** checks and auto-fixes linting issues (`.ts`, `.tsx`, `.js`, `.jsx`)

If there are unfixable linting errors, the commit will be blocked until you fix them.

### Setup for Teammates

After cloning the repository, simply run:

```bash
npm install
```

This automatically sets up the pre-commit hooks. No additional configuration needed.

**Troubleshooting:**

If pre-commit hooks aren't running, try:

```bash
# Reinstall husky hooks
npm run prepare
```

If you encounter Node.js path issues in your terminal (e.g., "command not found: npx"), ensure your shell can find Node. The pre-commit hook already includes common paths for nvm users.

### Manual Commands

You can also run these commands manually:

```bash
# Format all files
npm run format

# Check formatting without changes
npm run format:check

# Run linter
npm run lint

# Run linter and auto-fix
npm run lint:fix

# Type check
npm run typecheck
```
