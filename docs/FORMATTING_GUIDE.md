# Code Formatting & Linting Guide

## Overview

This project uses **Prettier** for code formatting and **ESLint** for code quality. These tools ensure consistent code style across the team and prevent formatting debates in PRs.

## The Golden Rule

**We don't discuss formatting in PRs. If the tool doesn't like it, fix the tool config.**

## How It Works

### Prettier (Formatting)

- **What it does**: Controls code appearance (whitespace, line breaks, quotes, etc.)
- **When it runs**:
  - Automatically on save (if VS Code is configured)
  - Automatically before every commit (via pre-commit hook)
  - Manually via `npm run format`

### ESLint (Code Quality)

- **What it does**: Catches bugs, enforces best practices, ensures code correctness
- **When it runs**:
  - Automatically on save (if VS Code is configured)
  - Automatically before every commit (via pre-commit hook)
  - Manually via `npm run lint` or `npm run lint:fix`

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will automatically set up Husky hooks (via the `prepare` script).

### 2. VS Code Setup (Recommended)

Install the recommended extensions when prompted, or manually install:

- **Prettier** (`esbenp.prettier-vscode`)
- **ESLint** (`dbaeumer.vscode-eslint`)
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
- **Error Lens** (`usernamehw.errorlens`) - Shows linting errors inline

The workspace settings (`.vscode/settings.json`) are already configured to:

- Format code on save with Prettier
- Auto-fix ESLint issues on save
- Use double quotes (matches Prettier config)

### 3. Verify Setup

Test that everything works:

```bash
# Check formatting
npm run format:check

# Check linting
npm run lint

# Fix all auto-fixable issues
npm run lint:fix
npm run format
```

## Available Scripts

| Command                | Description                                |
| ---------------------- | ------------------------------------------ |
| `npm run format`       | Format all files with Prettier             |
| `npm run format:check` | Check if files are formatted (CI-friendly) |
| `npm run lint`         | Run ESLint on all files                    |
| `npm run lint:fix`     | Auto-fix ESLint issues                     |
| `npm run typecheck`    | Run TypeScript type checking               |

## Pre-commit Hook

When you try to commit, the pre-commit hook will:

1. Run Prettier on staged files
2. Run ESLint on staged files
3. Block the commit if there are unfixable errors

**This means you literally cannot commit unformatted code.**

## Configuration Files

- **`.prettierrc`** - Prettier formatting rules
- **`.prettierignore`** - Files/folders to skip formatting
- **`eslint.config.mjs`** - ESLint rules (flat config)
- **`lint-staged.config.js`** - What to run on staged files
- **`.husky/pre-commit`** - Pre-commit hook script
- **`.vscode/settings.json`** - VS Code workspace settings

## Customizing Rules

### To change formatting rules:

1. Edit `.prettierrc`
2. Run `npm run format` to reformat everything
3. Commit the changes

### To change linting rules:

1. Edit `eslint.config.mjs`
2. Run `npm run lint:fix` to apply changes
3. Commit the changes

## Troubleshooting

### Pre-commit hook not running?

```bash
# Reinitialize Husky
npx husky install
```

### Format on save not working?

1. Check that Prettier extension is installed
2. Check that `.vscode/settings.json` exists
3. Reload VS Code window

### ESLint errors blocking commits?

- Fix the errors or add them to the ESLint config as warnings
- Don't try to bypass the hooks with `--no-verify`

### Merge conflicts in formatted files?

```bash
# After resolving conflicts, reformat
npm run format
npm run lint:fix
```

## Best Practices

1. **Commit formatted code only** - The pre-commit hook enforces this
2. **Don't fight the tools** - If you don't like a rule, discuss changing it
3. **Format before pushing** - Run `npm run format && npm run lint:fix` before pushing large changes
4. **Keep configs in sync** - Always commit config changes to the repo

## CI/CD Integration

For CI pipelines, add these checks:

```yaml
# Example GitHub Actions
- name: Check formatting
  run: npm run format:check

- name: Lint
  run: npm run lint

- name: Type check
  run: npm run typecheck
```

## Why This Setup?

### Benefits

✅ Zero formatting debates in PRs  
✅ Consistent code style across the team  
✅ Catches bugs before they reach production  
✅ Automatic fixes for most issues  
✅ Editor integration for instant feedback  
✅ Cannot commit unformatted code

### Minimal friction

- One-time setup per developer
- Automatic enforcement via pre-commit hooks
- No manual intervention needed after setup

## Questions?

- **Prettier docs**: https://prettier.io/docs/en/
- **ESLint docs**: https://eslint.org/docs/latest/
- **Husky docs**: https://typicode.github.io/husky/

---

**Remember**: The tools work for you, not the other way around. If a rule doesn't make sense, let's change it together!
