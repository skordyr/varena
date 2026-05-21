import type { Simplify } from "../shared/types";
import type { Tokens } from "../tokens";
import type { AnimationSystem } from "./animation";
import type { BorderSystem } from "./border";
import type { ColorSystem, PaletteSystem } from "./color";
import type { EffectSystem } from "./effect";
import type { FilterSystem } from "./filter";
import type { InteractivitySystem } from "./interactivity";
import type { LayoutSystem } from "./layout";
import type { SpacingSystem } from "./spacing";
import type { TypographySystem } from "./typography";

import { run } from "../shared/utils";
import { createTokens } from "../tokens";
import { AnimationTokens } from "./animation";
import { BorderTokens } from "./border";
import { ColorTokens, PaletteTokens } from "./color";
import { EffectTokens } from "./effect";
import { FilterTokens } from "./filter";
import { InteractivityTokens } from "./interactivity";
import { LayoutTokens } from "./layout";
import { SpacingTokens } from "./spacing";
import { TypographyTokens } from "./typography";

export type DesignSystem = Simplify<
  AnimationSystem &
    BorderSystem &
    ColorSystem &
    EffectSystem &
    FilterSystem &
    InteractivitySystem &
    LayoutSystem &
    PaletteSystem &
    SpacingSystem &
    TypographySystem
>;

export const DesignTokens: Tokens<DesignSystem> = /* @__PURE__ */ run(() =>
  createTokens({
    ...AnimationTokens.definition,
    ...BorderTokens.definition,
    ...ColorTokens.definition,
    ...EffectTokens.definition,
    ...FilterTokens.definition,
    ...InteractivityTokens.definition,
    ...LayoutTokens.definition,
    ...PaletteTokens.definition,
    ...SpacingTokens.definition,
    ...TypographyTokens.definition,
  }),
);
