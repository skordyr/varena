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
  radius: "0.5rem",
  "radius-none": "0",
  "radius-xs": "0.125rem",
  "radius-sm": "0.25rem",
  "radius-md": "0.375rem",
  "radius-lg": "0.5rem",
  "radius-xl": "0.75rem",
  "radius-2xl": "1rem",
  "radius-3xl": "1.5rem",
  "radius-4xl": "2rem",
  "radius-full": "9999px",
});
