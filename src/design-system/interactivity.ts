import type { Tokens } from "../tokens";

import { createTokens } from "../tokens";

export type InteractivitySystem = {
  "cursor-interactive": string;
  "cursor-disabled": string;
};

export const InteractivityTokens: Tokens<InteractivitySystem> = /* @__PURE__ */ createTokens({
  "cursor-interactive": "pointer",
  "cursor-disabled": "not-allowed",
});
