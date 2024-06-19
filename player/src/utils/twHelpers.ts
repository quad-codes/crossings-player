import { create } from "twrnc"

/** Turns tailwind strings into style objects */
export const tw = create(require(`../../tailwind.config.js`))

export const tws = tw.style
