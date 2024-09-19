#!/usr/bin/env node

const { execSync } = require("child_process")
const { diff, rsort } = require("semver")

const tags = execSync("git tag").toString().split("\n")
const versionTags = tags
	.filter((tag) => tag.startsWith("version"))
	.map((tag) => tag.replace("version/", ""))
const sortedTags = rsort(versionTags)

console.log(sortedTags)

const currentDiff = diff(sortedTags[0], sortedTags[1])

console.log(currentDiff)

if (currentDiff === "major" || currentDiff === "minor") {
	execSync("pnpm run build:prod --no-wait -p ios", { stdio: "inherit" })
	execSync("pnpm run build:devdevice --no-wait -p ios", { stdio: "inherit" })
	execSync("pnpm run build:dev --no-wait -p ios", { stdio: "inherit" })
}
if (currentDiff === "patch") {
	const latestSha = execSync("git log -1 --format=%h").toString().trim()
	execSync("pnpm run updatejs " + latestSha, { stdio: "inherit" })
}
