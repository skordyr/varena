import type { Tokens } from "../tokens";

import { createTokens } from "../tokens";

export type LayoutSystem = {
  "z-hide": string;
  "z-base": string;
  "z-docked": string;
  "z-dropdown": string;
  "z-sticky": string;
  "z-banner": string;
  "z-overlay": string;
  "z-modal": string;
  "z-popover": string;
  "z-skip-nav": string;
  "z-toast": string;
  "z-tooltip": string;
  "z-max": string;

  "aspect-square": string;
  "aspect-landscape": string;
  "aspect-portrait": string;
  "aspect-wide": string;
  "aspect-ultrawide": string;
  "aspect-golden": string;
};

export const LayoutTokens: Tokens<LayoutSystem> = /* @__PURE__ */ createTokens({
  "z-hide": "-1",
  "z-base": "0",
  "z-docked": "10",
  "z-dropdown": "1000",
  "z-sticky": "1100",
  "z-banner": "1200",
  "z-overlay": "1300",
  "z-modal": "1400",
  "z-popover": "1500",
  "z-skip-nav": "1600",
  "z-toast": "1700",
  "z-tooltip": "1800",
  "z-max": "2147483647",

  "aspect-square": "1 / 1",
  "aspect-landscape": "4 / 3",
  "aspect-portrait": "3 / 4",
  "aspect-wide": "16 / 9",
  "aspect-ultrawide": "18 / 5",
  "aspect-golden": "1.618 / 1",
});
