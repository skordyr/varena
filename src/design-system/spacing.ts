import type { Tokens } from "../tokens";

import { createTokens } from "../tokens";

export type SpacingSystem = {
  spacing: string;
  "spacing-0": string;
  "spacing-0_5": string;
  "spacing-1": string;
  "spacing-1_5": string;
  "spacing-2": string;
  "spacing-2_5": string;
  "spacing-3": string;
  "spacing-3_5": string;
  "spacing-4": string;
  "spacing-4_5": string;
  "spacing-5": string;
  "spacing-5_5": string;
  "spacing-6": string;
  "spacing-7": string;
  "spacing-8": string;
  "spacing-9": string;
  "spacing-10": string;
  "spacing-11": string;
  "spacing-12": string;
  "spacing-14": string;
  "spacing-16": string;
  "spacing-20": string;
  "spacing-24": string;
  "spacing-28": string;
  "spacing-32": string;
  "spacing-36": string;
  "spacing-40": string;
  "spacing-44": string;
  "spacing-48": string;
  "spacing-52": string;
  "spacing-56": string;
  "spacing-60": string;
  "spacing-64": string;
  "spacing-72": string;
  "spacing-80": string;
  "spacing-96": string;
};

export const SpacingTokens: Tokens<SpacingSystem> = /* @__PURE__ */ createTokens({
  spacing: "0.25rem",
  "spacing-0": "0rem",
  "spacing-0_5": "0.125rem",
  "spacing-1": "0.25rem",
  "spacing-1_5": "0.375rem",
  "spacing-2": "0.5rem",
  "spacing-2_5": "0.625rem",
  "spacing-3": "0.75rem",
  "spacing-3_5": "0.875rem",
  "spacing-4": "1rem",
  "spacing-4_5": "1.125rem",
  "spacing-5": "1.25rem",
  "spacing-5_5": "1.375rem",
  "spacing-6": "1.5rem",
  "spacing-7": "1.75rem",
  "spacing-8": "2rem",
  "spacing-9": "2.25rem",
  "spacing-10": "2.5rem",
  "spacing-11": "2.75rem",
  "spacing-12": "3rem",
  "spacing-14": "3.5rem",
  "spacing-16": "4rem",
  "spacing-20": "5rem",
  "spacing-24": "6rem",
  "spacing-28": "7rem",
  "spacing-32": "8rem",
  "spacing-36": "9rem",
  "spacing-40": "10rem",
  "spacing-44": "11rem",
  "spacing-48": "12rem",
  "spacing-52": "13rem",
  "spacing-56": "14rem",
  "spacing-60": "15rem",
  "spacing-64": "16rem",
  "spacing-72": "18rem",
  "spacing-80": "20rem",
  "spacing-96": "24rem",
});
