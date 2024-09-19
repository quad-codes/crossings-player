import extraJson from "./extraConfig.json"
import packageJson from "./package.json"
import { patch } from "semver"

export const lang = extraJson.id

export const jsBuild = patch(packageJson.version)
