import type { Tokens } from "../tokens";

import { createTokens } from "../tokens";

export type TypographySystem = {
  "font-sans": string;
  "font-sans--font-feature-settings": string;
  "font-sans--font-variation-settings": string;
  "font-serif": string;
  "font-serif--font-feature-settings": string;
  "font-serif--font-variation-settings": string;
  "font-mono": string;
  "font-mono--font-feature-settings": string;
  "font-mono--font-variation-settings": string;
  "font-heading": string;
  "font-heading--font-feature-settings": string;
  "font-heading--font-variation-settings": string;
  "font-body": string;
  "font-body--font-feature-settings": string;
  "font-body--font-variation-settings": string;

  "font-weight-thin": string;
  "font-weight-extralight": string;
  "font-weight-light": string;
  "font-weight-normal": string;
  "font-weight-medium": string;
  "font-weight-semibold": string;
  "font-weight-bold": string;
  "font-weight-extrabold": string;
  "font-weight-black": string;

  text: string;
  "text-xs": string;
  "text-xs--line-height": string;
  "text-sm": string;
  "text-sm--line-height": string;
  "text-md": string;
  "text-md--line-height": string;
  "text-lg": string;
  "text-lg--line-height": string;
  "text-xl": string;
  "text-xl--line-height": string;
  "text-2xl": string;
  "text-2xl--line-height": string;
  "text-3xl": string;
  "text-3xl--line-height": string;
  "text-4xl": string;
  "text-4xl--line-height": string;
  "text-5xl": string;
  "text-5xl--line-height": string;
  "text-6xl": string;
  "text-6xl--line-height": string;
  "text-7xl": string;
  "text-7xl--line-height": string;
  "text-8xl": string;
  "text-8xl--line-height": string;
  "text-9xl": string;
  "text-9xl--line-height": string;

  "leading-none": string;
  "leading-tight": string;
  "leading-snug": string;
  "leading-normal": string;
  "leading-relaxed": string;
  "leading-loose": string;

  "tracking-tighter": string;
  "tracking-tight": string;
  "tracking-normal": string;
  "tracking-wide": string;
  "tracking-wider": string;
  "tracking-widest": string;
};

export const TypographyTokens: Tokens<TypographySystem> = /* @__PURE__ */ createTokens({
  "font-sans":
    'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  "font-sans--font-feature-settings": "normal",
  "font-sans--font-variation-settings": "normal",
  "font-serif": 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  "font-serif--font-feature-settings": "normal",
  "font-serif--font-variation-settings": "normal",
  "font-mono":
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  "font-mono--font-feature-settings": "normal",
  "font-mono--font-variation-settings": "normal",
  "font-heading": 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  "font-heading--font-feature-settings": "normal",
  "font-heading--font-variation-settings": "normal",
  "font-body":
    'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  "font-body--font-feature-settings": "normal",
  "font-body--font-variation-settings": "normal",

  "font-weight-thin": "100",
  "font-weight-extralight": "200",
  "font-weight-light": "300",
  "font-weight-normal": "400",
  "font-weight-medium": "500",
  "font-weight-semibold": "600",
  "font-weight-bold": "700",
  "font-weight-extrabold": "800",
  "font-weight-black": "900",

  text: "1rem", //                                  :16px
  "text-xs": "calc({text} * 0.75)", //              :12px
  "text-xs--line-height": "calc(1 / 0.75)", //      :1.333
  "text-sm": "calc({text} * 0.875)", //             :14px
  "text-sm--line-height": "calc(1.25 / 0.875)", //  :1.429
  "text-md": "{text}", //                           :16px
  "text-md--line-height": "calc(1.5 / 1)", //       :1.5
  "text-lg": "calc({text} * 1.125)", //             :18px
  "text-lg--line-height": "calc(1.75 / 1.125)", //  :1.556
  "text-xl": "calc({text} * 1.25)", //              :20px
  "text-xl--line-height": "calc(1.75 / 1.25)", //   :1.4
  "text-2xl": "calc({text} * 1.5)", //              :24px
  "text-2xl--line-height": "calc(2 / 1.5)", //      :1.333
  "text-3xl": "calc({text} * 1.875)", //            :30px
  "text-3xl--line-height": "calc(2.25 / 1.875)", // :1.2
  "text-4xl": "calc({text} * 2.25)", //             :36px
  "text-4xl--line-height": "calc(2.5 / 2.25)", //   :1.111
  "text-5xl": "calc({text} * 3)", //                :48px
  "text-5xl--line-height": "1", //                  :1
  "text-6xl": "calc({text} * 3.75)", //             :60px
  "text-6xl--line-height": "1", //                  :1
  "text-7xl": "calc({text} * 4.5)", //              :72px
  "text-7xl--line-height": "1", //                  :1
  "text-8xl": "calc({text} * 6)", //                :96px
  "text-8xl--line-height": "1", //                  :1
  "text-9xl": "calc({text} * 8)", //                :128px
  "text-9xl--line-height": "1", //                  :1

  "leading-none": "1",
  "leading-tight": "1.25",
  "leading-snug": "1.375",
  "leading-normal": "1.5",
  "leading-relaxed": "1.625",
  "leading-loose": "2",

  "tracking-tighter": "-0.05em",
  "tracking-tight": "-0.025em",
  "tracking-normal": "0em",
  "tracking-wide": "0.025em",
  "tracking-wider": "0.05em",
  "tracking-widest": "0.1em",
});
