import type { Tokens } from "../tokens";

import { createTokens } from "../tokens";

export type BorderSystem = {
  radius: string;
  "radius-none": string;
  "radius-xs": string;
  "radius-sm": string;
  "radius-md": string;
  "radius-lg": string;
  "radius-xl": string;
  "radius-2xl": string;
  "radius-3xl": string;
  "radius-4xl": string;
  "radius-full": string;
};

export const BorderTokens: Tokens<BorderSystem> = /* @__PURE__ */ createTokens({
  radius: "0.5rem", //                      :8px
  "radius-none": "0", //                    :0
  "radius-xs": "calc({radius} * 0.25)", //  :2px
  "radius-sm": "calc({radius} * 0.5)", //   :4px
  "radius-md": "calc({radius} * 0.75)", //  :6px
  "radius-lg": "{radius}", //               :8px
  "radius-xl": "calc({radius} * 1.5)", //   :12px
  "radius-2xl": "calc({radius} * 2)", //    :16px
  "radius-3xl": "calc({radius} * 3)", //    :24px
  "radius-4xl": "calc({radius} * 4)", //    :32px
  "radius-full": "9999px", //               :9999px
});
