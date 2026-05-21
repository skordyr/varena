import type { Tokens } from "../tokens";

import { createTokens } from "../tokens";

export type AnimationSystem = {
  "duration-fastest": string;
  "duration-faster": string;
  "duration-fast": string;
  "duration-normal": string;
  "duration-slow": string;
  "duration-slower": string;
  "duration-slowest": string;

  "ease-linear": string;
  "ease-in": string;
  "ease-out": string;
  "ease-in-out": string;
};

export const AnimationTokens: Tokens<AnimationSystem> = /* @__PURE__ */ createTokens({
  "duration-fastest": "50ms",
  "duration-faster": "100ms",
  "duration-fast": "150ms",
  "duration-normal": "200ms",
  "duration-slow": "300ms",
  "duration-slower": "400ms",
  "duration-slowest": "500ms",

  "ease-linear": "linear",
  "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
  "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
  "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
});
