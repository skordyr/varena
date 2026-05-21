import type { Tokens } from "../tokens";

import { createTokens } from "../tokens";

export type EffectSystem = {
  "shadow-none": string;
  "shadow-2xs": string;
  "shadow-xs": string;
  "shadow-sm": string;
  "shadow-md": string;
  "shadow-lg": string;
  "shadow-xl": string;
  "shadow-2xl": string;

  "inset-shadow-none": string;
  "inset-shadow-2xs": string;
  "inset-shadow-xs": string;
  "inset-shadow-sm": string;

  "text-shadow-none": string;
  "text-shadow-2xs": string;
  "text-shadow-xs": string;
  "text-shadow-sm": string;
  "text-shadow-md": string;
  "text-shadow-lg": string;
};

export const EffectTokens: Tokens<EffectSystem> = /* @__PURE__ */ createTokens({
  "shadow-none": "0 0 #0000",
  "shadow-2xs": "0 1px rgb(0 0 0 / 0.05)",
  "shadow-xs": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  "shadow-sm": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  "shadow-md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  "shadow-lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  "shadow-xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "shadow-2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",

  "inset-shadow-none": "inset 0 0 #0000",
  "inset-shadow-2xs": "inset 0 1px rgb(0 0 0 / 0.05)",
  "inset-shadow-xs": "inset 0 1px 1px rgb(0 0 0 / 0.05)",
  "inset-shadow-sm": "inset 0 2px 4px rgb(0 0 0 / 0.05)",

  "text-shadow-none": "none",
  "text-shadow-2xs": "0px 1px 0px rgb(0 0 0 / 0.15)",
  "text-shadow-xs": "0px 1px 1px rgb(0 0 0 / 0.2)",
  "text-shadow-sm":
    "0px 1px 0px rgb(0 0 0 / 0.075), 0px 1px 1px rgb(0 0 0 / 0.075), 0px 2px 2px rgb(0 0 0 / 0.075)",
  "text-shadow-md":
    "0px 1px 1px rgb(0 0 0 / 0.1), 0px 1px 2px rgb(0 0 0 / 0.1), 0px 2px 4px rgb(0 0 0 / 0.1)",
  "text-shadow-lg":
    "0px 1px 2px rgb(0 0 0 / 0.1), 0px 3px 2px rgb(0 0 0 / 0.1), 0px 4px 8px rgb(0 0 0 / 0.1)",
});
