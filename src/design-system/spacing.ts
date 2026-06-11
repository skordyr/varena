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
  spacing: "0.25rem", //                     :4px
  "spacing-0": "0", //                       :0
  "spacing-0_5": "calc({spacing} * 0.5)", // :2px
  "spacing-1": "{spacing}", //               :4px
  "spacing-1_5": "calc({spacing} * 1.5)", // :6px
  "spacing-2": "calc({spacing} * 2)", //     :8px
  "spacing-2_5": "calc({spacing} * 2.5)", // :10px
  "spacing-3": "calc({spacing} * 3)", //     :12px
  "spacing-3_5": "calc({spacing} * 3.5)", // :14px
  "spacing-4": "calc({spacing} * 4)", //     :16px
  "spacing-4_5": "calc({spacing} * 4.5)", // :18px
  "spacing-5": "calc({spacing} * 5)", //     :20px
  "spacing-5_5": "calc({spacing} * 5.5)", // :22px
  "spacing-6": "calc({spacing} * 6)", //     :24px
  "spacing-7": "calc({spacing} * 7)", //     :28px
  "spacing-8": "calc({spacing} * 8)", //     :32px
  "spacing-9": "calc({spacing} * 9)", //     :36px
  "spacing-10": "calc({spacing} * 10)", //   :40px
  "spacing-11": "calc({spacing} * 11)", //   :44px
  "spacing-12": "calc({spacing} * 12)", //   :48px
  "spacing-14": "calc({spacing} * 14)", //   :56px
  "spacing-16": "calc({spacing} * 16)", //   :64px
  "spacing-20": "calc({spacing} * 20)", //   :80px
  "spacing-24": "calc({spacing} * 24)", //   :96px
  "spacing-28": "calc({spacing} * 28)", //   :112px
  "spacing-32": "calc({spacing} * 32)", //   :128px
  "spacing-36": "calc({spacing} * 36)", //   :144px
  "spacing-40": "calc({spacing} * 40)", //   :160px
  "spacing-44": "calc({spacing} * 44)", //   :176px
  "spacing-48": "calc({spacing} * 48)", //   :192px
  "spacing-52": "calc({spacing} * 52)", //   :208px
  "spacing-56": "calc({spacing} * 56)", //   :224px
  "spacing-60": "calc({spacing} * 60)", //   :240px
  "spacing-64": "calc({spacing} * 64)", //   :256px
  "spacing-72": "calc({spacing} * 72)", //   :288px
  "spacing-80": "calc({spacing} * 80)", //   :320px
  "spacing-96": "calc({spacing} * 96)", //   :384px
});
