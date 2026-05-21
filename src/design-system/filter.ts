import type { Tokens } from "../tokens";

import { createTokens } from "../tokens";

export type FilterSystem = {
  "blur-none": string;
  "blur-xs": string;
  "blur-sm": string;
  "blur-md": string;
  "blur-lg": string;
  "blur-xl": string;
  "blur-2xl": string;
  "blur-3xl": string;

  "drop-shadow-none": string;
  "drop-shadow-xs": string;
  "drop-shadow-sm": string;
  "drop-shadow-md": string;
  "drop-shadow-lg": string;
  "drop-shadow-xl": string;
  "drop-shadow-2xl": string;
};

export const FilterTokens: Tokens<FilterSystem> = /* @__PURE__ */ createTokens({
  "blur-none": "",
  "blur-xs": "4px",
  "blur-sm": "8px",
  "blur-md": "12px",
  "blur-lg": "16px",
  "blur-xl": "24px",
  "blur-2xl": "40px",
  "blur-3xl": "64px",

  "drop-shadow-none": "0 0 #0000",
  "drop-shadow-xs": "0 1px 1px rgb(0 0 0 / 0.05)",
  "drop-shadow-sm": "0 1px 2px rgb(0 0 0 / 0.15)",
  "drop-shadow-md": "0 3px 3px rgb(0 0 0 / 0.12)",
  "drop-shadow-lg": "0 4px 4px rgb(0 0 0 / 0.15)",
  "drop-shadow-xl": "0 9px 7px rgb(0 0 0 / 0.1)",
  "drop-shadow-2xl": "0 25px 25px rgb(0 0 0 / 0.15)",
});
