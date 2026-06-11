import type { Simplify } from "../shared/types";
import type { Tokens } from "../tokens";
import type { AnimationSystem } from "./animation";
import type { BorderSystem } from "./border";
import type {
  AmberSystem,
  BlackWhiteSystem,
  BlueSystem,
  ColorSystem,
  CyanSystem,
  EmeraldSystem,
  FuchsiaSystem,
  GraySystem,
  GreenSystem,
  IndigoSystem,
  LimeSystem,
  MauveSystem,
  MistSystem,
  NeutralSystem,
  OliveSystem,
  OrangeSystem,
  PinkSystem,
  PurpleSystem,
  RedSystem,
  RoseSystem,
  SkySystem,
  SlateSystem,
  StoneSystem,
  TaupeSystem,
  TealSystem,
  VioletSystem,
  YellowSystem,
  ZincSystem,
} from "./color";
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
import {
  AmberTokens,
  BlackWhiteTokens,
  BlueTokens,
  ColorTokens,
  CyanTokens,
  EmeraldTokens,
  FuchsiaTokens,
  GrayTokens,
  GreenTokens,
  IndigoTokens,
  LimeTokens,
  MauveTokens,
  MistTokens,
  NeutralTokens,
  OliveTokens,
  OrangeTokens,
  PinkTokens,
  PurpleTokens,
  RedTokens,
  RoseTokens,
  SkyTokens,
  SlateTokens,
  StoneTokens,
  TaupeTokens,
  TealTokens,
  VioletTokens,
  YellowTokens,
  ZincTokens,
} from "./color";
import { EffectTokens } from "./effect";
import { FilterTokens } from "./filter";
import { InteractivityTokens } from "./interactivity";
import { LayoutTokens } from "./layout";
import { SpacingTokens } from "./spacing";
import { TypographyTokens } from "./typography";

export type DesignSystem = Simplify<
  ColorSystem &
    SpacingSystem &
    TypographySystem &
    BorderSystem &
    EffectSystem &
    AnimationSystem &
    LayoutSystem &
    InteractivitySystem &
    FilterSystem &
    BlackWhiteSystem &
    RedSystem &
    OrangeSystem &
    AmberSystem &
    YellowSystem &
    LimeSystem &
    GreenSystem &
    EmeraldSystem &
    TealSystem &
    CyanSystem &
    SkySystem &
    BlueSystem &
    IndigoSystem &
    VioletSystem &
    PurpleSystem &
    FuchsiaSystem &
    PinkSystem &
    RoseSystem &
    SlateSystem &
    GraySystem &
    ZincSystem &
    NeutralSystem &
    StoneSystem &
    MauveSystem &
    OliveSystem &
    MistSystem &
    TaupeSystem
>;

export const DesignTokens: Tokens<DesignSystem> = /* @__PURE__ */ run(() =>
  createTokens({
    ...ColorTokens.definition,
    ...SpacingTokens.definition,
    ...TypographyTokens.definition,
    ...BorderTokens.definition,
    ...EffectTokens.definition,
    ...AnimationTokens.definition,
    ...LayoutTokens.definition,
    ...InteractivityTokens.definition,
    ...FilterTokens.definition,
    ...BlackWhiteTokens.definition,
    ...RedTokens.definition,
    ...OrangeTokens.definition,
    ...AmberTokens.definition,
    ...YellowTokens.definition,
    ...LimeTokens.definition,
    ...GreenTokens.definition,
    ...EmeraldTokens.definition,
    ...TealTokens.definition,
    ...CyanTokens.definition,
    ...SkyTokens.definition,
    ...BlueTokens.definition,
    ...IndigoTokens.definition,
    ...VioletTokens.definition,
    ...PurpleTokens.definition,
    ...FuchsiaTokens.definition,
    ...PinkTokens.definition,
    ...RoseTokens.definition,
    ...SlateTokens.definition,
    ...GrayTokens.definition,
    ...ZincTokens.definition,
    ...NeutralTokens.definition,
    ...StoneTokens.definition,
    ...MauveTokens.definition,
    ...OliveTokens.definition,
    ...MistTokens.definition,
    ...TaupeTokens.definition,
  }),
);
