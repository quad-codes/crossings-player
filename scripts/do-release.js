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
	execSync("pnpm run build:prod -p ios", { stdio: "inherit" })
}
if (currentDiff === "patch") {
	execSync("pnpm run updatejs testtt", { stdio: "inherit" })
}
