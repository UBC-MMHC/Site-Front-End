#!/usr/bin/env node
/**
 * Patches package-lock.json to replace local file links for @ubc-mmhc/blog-frontend
 * with the registry tarball URL. Fetches the correct URL from npm/GitHub Packages
 * at runtime, so it remains valid when the package is republished.
 */
const fs = require("fs");
const { execSync } = require("child_process");

const lock = JSON.parse(fs.readFileSync("package-lock.json", "utf8"));
const pkg = lock.packages["node_modules/@ubc-mmhc/blog-frontend"];
const local = lock.packages["../blog-frontend"];

if (!pkg?.resolved?.includes("../blog-frontend") || !local) {
	process.exit(0);
}

const version = local.version;
const tarball = execSync(`npm view @ubc-mmhc/blog-frontend@${version} dist.tarball`, {
	encoding: "utf8",
}).trim();

delete lock.packages["../blog-frontend"];
lock.packages["node_modules/@ubc-mmhc/blog-frontend"] = {
	...local,
	resolved: tarball,
};
delete lock.packages["node_modules/@ubc-mmhc/blog-frontend"].link;
fs.writeFileSync("package-lock.json", JSON.stringify(lock, null, 2));

// Resolve and add any missing nested dependencies (e.g. react-markdown) to the lockfile.
// When blog-frontend was a local link, its deps weren't in the lockfile.
execSync("npm install --package-lock-only", { stdio: "inherit" });
