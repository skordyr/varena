# varena

A framework-agnostic, type-safe styling library for building component variants and design tokens, with first-class slots support. Inspired by [Stitches](https://stitches.dev/).

## Features

- Framework agnostic: works anywhere you can use plain strings and style objects.
- Type-safe variants: strongly typed variant names and values.
- Slot-based components: define slot classes for `root`, `icon`, `label`, and any custom slot.
- Compound variants: apply slot classes when multiple variant conditions match.
- Design tokens: generate CSS custom properties and `var(...)` references with types.
- Tiny utilities: `cx` for class merging and `sx` for style merging.

## Installation

```bash
pnpm add varena
# or
npm install varena
# or
yarn add varena
```

## Quick Start

### Button with Tailwind CSS

```
project/
├── lib/
│   └── varena.ts          # varena instance with twMerge
└── components/
    └── button.tsx         # button component + styles
```

```bash
pnpm add varena tailwind-merge
```

```ts
// lib/varena.ts
import { create } from "varena";
import { twMerge } from "tailwind-merge";

export const { createStyles, createTokens } = create({
  mergeClasses: twMerge,
});
```

```tsx
// components/button.tsx
import type { InferComponentStylesConfig } from "varena";

import * as React from "react";

// Note: `@/` is a path alias, use your project's import path
import { createStyles, cx } from "@/lib/varena";

const ButtonStyles = createStyles({
  slots: {
    root: cx(
      "inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors",
    ),
    icon: cx("mr-2 h-4 w-4"),
  },
  variants: {
    disabled: {
      true: { root: cx("opacity-50 cursor-not-allowed") },
    },
    variant: {
      solid: { root: cx("bg-blue-600 text-white hover:bg-blue-700") },
      outline: { root: cx("border border-gray-300 hover:bg-gray-50") },
    },
    size: {
      sm: { root: cx("text-sm px-3 py-1.5"), icon: cx("h-3 w-3") },
      md: { root: cx("px-4 py-2"), icon: cx("h-4 w-4") },
      lg: { root: cx("text-lg px-6 py-3"), icon: cx("h-5 w-5") },
    },
    icon: {
      true: { root: cx("px-2"), icon: cx("mr-0") },
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
    icon: false,
    disabled: false,
  },
});

type ButtonStylesConfig = InferComponentStylesConfig<typeof ButtonStyles>;

export interface ButtonProps extends Omit<ButtonStylesConfig, "icon"> {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export function Button(props: ButtonProps) {
  const { style, className, children, icon, slots, disabled, variant, size } = props;

  const $slots = ButtonStyles(
    { slots, variants: { disabled, variant, size, icon: Boolean(icon) && !children } },
    className,
  );

  return (
    <button style={style} className={$slots.root} disabled={disabled}>
      {icon && <span className={$slots.icon}>{icon}</span>}
      {children}
    </button>
  );
}
```

```tsx
// usage

// Basic button with default solid style
<Button>Click me</Button>

// Outline variant for secondary actions
<Button variant="outline">Cancel</Button>

// Large size for prominent CTAs
<Button size="lg">Get Started</Button>

// Disabled state for unavailable actions
<Button disabled>Loading...</Button>

// Button with icon for better visual cues
<Button icon={<PlusIcon />}>Add Item</Button>

// Icon-only button for compact UI
<Button icon={<SettingsIcon />} />

// Override root slot class via className
<Button className="bg-green-600 hover:bg-green-700">Custom Color</Button>

// Override multiple slots via slots prop
<Button slots={{ root: "w-full", icon: "animate-spin" }} icon={<LoadingIcon />}>
  Loading...
</Button>
```

### Theme with design tokens

```
project/
├── styles/
│   ├── theme.ts               # Theme token configuration
│   ├── global.ts              # Global style injection
│   └── theme.css              # Generated theme CSS file
├── scripts/
│   └── generate-theme-css.ts  # CSS generation script
└── app/
    └── global.css             # Global CSS imports
```

```bash
pnpm add varena @emotion/css
```

```ts
// styles/theme.ts
import { ColorTokens } from "varena/design-system";

// Extend tokens for a custom theme
export const ThemeTokens = createTokens({ ...ColorTokens.definition });
```

```ts
// styles/global.ts
import { injectGlobal } from "@emotion/css";

// Note: `@/` is a path alias, use your project's import path
import { ThemeTokens } from "@/styles/theme";

// Inject tokens as CSS variables globally
injectGlobal(ThemeTokens.css());
```

```tsx
// Use theme tokens with CSS-in-JS
import { css } from "@emotion/css";

// Note: `@/` is a path alias, use your project's import path
import { ThemeTokens } from "@/styles/theme";

// Color tokens use space-separated RGB values, supporting opacity via CSS rgb()
css`
  background-color: rgb(${ThemeTokens.variable("color-danger")} / 0.1);
  color: rgb(${ThemeTokens.variable("color-danger")});
`;
```

```ts
// scripts/generate-theme-css.ts
import * as fs from "node:fs/promises";

import type { ColorSystem } from "varena/design-system";

// Note: `@/` is a path alias, use your project's import path
import { ThemeTokens } from "@/styles/theme";

// Generate theme CSS with inline color tokens for Tailwind CSS
await fs.writeFile(
  "./styles/theme.css",
  `
${ThemeTokens.css(
  Object.keys(ThemeTokens.definition).reduce<Partial<ColorSystem>>((result, key) => {
    result[key as keyof ColorSystem] = `rgb(${ThemeTokens.variable(key as keyof ColorSystem)})`;

    return result;
  }, {}),
  "@theme inline",
)}
${ThemeTokens.css()}
`,
);
```

```css
/* app/global.css */
@import "tailwindcss";
@import "tw-animate-css";

/* Import generated theme tokens */
@import "styles/theme.css";
```

```tsx
// Use theme tokens with Tailwind CSS

// Use color tokens with opacity modifier
<div className="bg-danger/10 text-danger" />
```

## API Reference

### varena

Core styling utilities providing type-safe APIs for building component variants and design tokens.

#### `create(options?)`

Create a preconfigured varena instance so `createStyles` and `createTokens` share defaults.

**Parameters**

- `options?` - Optional global defaults applied to both factories.
- `options.mergeClasses?(...classes)` - Default class merge strategy injected into `createStyles`.
- `options.createVariableName?(key, prefix?)` - Default token-key-to-variable-name mapper injected into `createTokens`.

**Returns**

- `createStyles(styles, options?)` - Preconfigured `createStyles` function with the provided defaults applied.
- `createTokens(tokens, options?)` - Preconfigured `createTokens` function with the provided defaults applied.

**Examples**

```ts
import { create } from "varena";
import { twMerge } from "tailwind-merge";

export const { createStyles, createTokens } = create({
  mergeClasses: twMerge,
});
```

#### `createStyles(styles, options?)`

Create a typed slot styles factory for slot-based components with variants, compound variants, and defaults.

**Parameters**

- `styles.slots` - Base class names for each slot key.
- `styles.variants?` - Variant definitions that override slot classes based on variant values.
- `styles.compoundVariants?` - Additional slot classes applied when multiple variant conditions match simultaneously.
- `styles.defaultVariants?` - Default variants used when call-time variants are omitted.
- `options?` - Optional style factory behavior overrides.
- `options.mergeClasses?(...classes)` - Custom class merging function (default joins with spaces).

**Returns**

- `Styles(config?, overrides?)` - Resolves final slot classes by combining defaults, variants, and overrides.
- `Styles.definition` - Original style definition passed to `createStyles`.
- `Styles.slots` - Cached slots resolved from base slots + `defaultVariants`.

**Call-time Parameters**

- `config.variants?` - Per-call variant overrides.
- `config.slots?` - Per-call slot class patches, either object or function form.
- `overrides?` - Final override layer applied after variants/config slots. When a `string`, it is treated as the `root` slot.

**Examples**

```ts
import type { InferComponentStylesConfig } from "varena";
import { createStyles } from "varena";

export const ButtonStyles = createStyles({
  slots: {
    root: "btn",
    icon: "btn__icon",
  },
  variants: {
    size: {
      sm: { root: "btn--sm", icon: "btn__icon--sm" },
      lg: { root: "btn--lg", icon: "btn__icon--lg" },
    },
    tone: {
      neutral: { root: "btn--neutral" },
      danger: { root: "btn--danger" },
    },
  },
  compoundVariants: [
    {
      variants: { size: "lg", tone: "danger" },
      slots: { root: "btn--lg-danger" },
    },
  ],
  defaultVariants: {
    size: "sm",
    tone: "neutral",
  },
});

export type ButtonStylesConfig = InferComponentStylesConfig<typeof ButtonStyles>;
// => {
//   slots?: { root?: string; icon?: string } | ...;
//   size?: "sm" | "lg";
//   tone?: "neutral" | "danger";
// }
```

```ts
ButtonStyles.definition;
// => { slots: {...}, variants: {...}, compoundVariants: [...], defaultVariants: {...} }

ButtonStyles.slots;
// => { root: "btn btn--sm btn--neutral", icon: "btn__icon btn__icon--sm" }

const slots = ButtonStyles();

slots.root;
// => "btn btn--sm btn--neutral"

slots.icon;
// => "btn__icon btn__icon--sm"
```

```ts
const slots = ButtonStyles({ variants: { size: "lg", tone: "danger" } });

slots.root;
// => "btn btn--lg btn--danger btn--lg-danger"

slots.icon;
// => "btn__icon btn__icon--lg"
```

```ts
const slots = ButtonStyles(
  { slots: { icon: "custom-icon" }, variants: { size: "lg" } },
  "override-root",
);

slots.root;
// => "btn btn--lg btn--neutral override-root"

slots.icon;
// => "btn__icon btn__icon--lg custom-icon"
```

```ts
const slots = ButtonStyles(
  { slots: { icon: "custom-icon" }, variants: { size: "lg" } },
  { root: "override-root" },
);

slots.root;
// => "btn btn--lg btn--neutral override-root"

slots.icon;
// => "btn__icon btn__icon--lg custom-icon"
```

```ts
const slots = ButtonStyles({
  slots: (variants) => ({
    root: variants.tone === "danger" ? "btn--ring" : undefined,
  }),
  variants: { tone: "danger" },
});

slots.root;
// => "btn btn--sm btn--danger btn--ring"
```

#### `createTokens(tokens, options?)`

Create a typed token factory for generating CSS custom properties and `var(...)` helpers.

**Parameters**

- `tokens` - Base token definition map.
- `options?` - Optional token factory behavior overrides.
- `options.prefix?` - Prefix prepended to generated CSS custom property names.
- `options.createVariableName?(key, prefix?)` - Custom formatter for CSS variable names.

**Returns**

- `Tokens(config)` - Generates a style object with only the specified CSS custom property overrides.
- `Tokens.definition` - Original token definition passed to `createTokens`.
- `Tokens.style` - Cached style object generated from full default token values.
- `Tokens.css(selector?, wrapper?)` - Returns a formatted CSS string for creating CSS files.
- `Tokens.css(config, selector?, wrapper?)` - Returns a formatted CSS string with only the specified CSS custom property overrides.
- `Tokens.value(key)` - Reads a token value. Returns `undefined` if the key is not defined.
- `Tokens.value(key, fallback)` - Reads a token value with a guaranteed non-null return, using `fallback` when the key is missing.
- `Tokens.value(key, fallback?)` - Reads a token value. Returns `undefined` if the key is not defined and no fallback is provided.
- `Tokens.property(key)` - Returns the CSS custom property name for a token key.
- `Tokens.variable(key, fallback?)` - Returns `var(...)` reference for a token key, with optional fallback.
- `Tokens.extend(config)` - Returns a new `Tokens` instance with merged default values.

**Call-time Parameters**

- `config` - Partial token overrides to generate a style object for a specific context.

**Examples**

```ts
import type { InferTokensConfig } from "varena";
import { createTokens } from "varena";

export const ThemeTokens = createTokens<{
  "color.primary": string;
  "color.secondary"?: string;
  "radius.md": string;
}>(
  {
    "color.primary": "#0ea5e9",
    "radius.md": "8px",
  },
  { prefix: "app" },
);

export type ThemeTokensConfig = InferTokensConfig<typeof ThemeTokens>;
// => { "color.primary"?: string; "color.secondary"?: string; "radius.md"?: string }
```

```ts
ThemeTokens.definition;
// => { "color.primary": "#0ea5e9", "radius.md": "8px" }

ThemeTokens({});
// => {}

ThemeTokens({ "color.primary": "#0369a1" });
// => { "--app-color-primary": "#0369a1" }

ThemeTokens.style;
// => { "--app-color-primary": "#0ea5e9", "--app-radius-md": "8px" }

ThemeTokens.css();
// =>
// :root {
//   --app-color-primary: #0ea5e9;
//   --app-radius-md: 8px;
// }

ThemeTokens.css("#main");
// =>
// #main {
//   --app-color-primary: #0ea5e9;
//   --app-radius-md: 8px;
// }

ThemeTokens.css(":root", "@media (prefers-color-scheme: dark)");
// =>
// @media (prefers-color-scheme: dark) {
//   :root {
//     --app-color-primary: #0ea5e9;
//     --app-radius-md: 8px;
//   }
// }

ThemeTokens.css({ ...ThemeTokens.definition, "color.primary": "#ff0000" });
// =>
// :root {
//   --app-radius-md: 8px;
//   --app-color-primary: #ff0000;
// }

ThemeTokens.css({ ...ThemeTokens.definition, "color.primary": "#ff0000" }, "#main");
// =>
// #main {
//   --app-radius-md: 8px;
//   --app-color-primary: #ff0000;
// }

ThemeTokens.css(
  { ...ThemeTokens.definition, "color.primary": "#ff0000" },
  ":root",
  "@media (prefers-color-scheme: dark)",
);
// =>
// @media (prefers-color-scheme: dark) {
//   :root {
//     --app-radius-md: 8px;
//     --app-color-primary: #ff0000;
//   }
// }

ThemeTokens.css({});
// => ""

ThemeTokens.value("color.primary");
// => "#0ea5e9"

ThemeTokens.value("color.secondary", "#64748b");
// => "#64748b" (returns fallback since key not in definition)

ThemeTokens.property("color.primary");
// => "--app-color-primary"

ThemeTokens.variable("color.primary");
// => "var(--app-color-primary)"

ThemeTokens.variable("radius.md", "6px");
// => "var(--app-radius-md, 6px)"
```

```ts
export const DarkThemeTokens = ThemeTokens.extend({
  "color.primary": "#0284c7",
});
```

```ts
DarkThemeTokens.definition;
// => { "color.primary": "#0284c7", "radius.md": "8px" }

DarkThemeTokens.style;
// => { "--app-color-primary": "#0284c7", "--app-radius-md": "8px" }

DarkThemeTokens.value("color.primary");
// => "#0284c7"
```

#### `cx(...classes)`

Merge class names and ignore falsy `undefined` entries.

**Parameters**

- `classes` - Class names to merge in order.

**Returns**

- Merged class string with `undefined` entries skipped.

**Examples**

```ts
import { cx } from "varena";

cx("btn", undefined, "btn--primary", "rounded-md");
// => "btn btn--primary rounded-md"
```

#### `sx(...styles)`

Merge style objects and ignore `undefined` entries.

**Parameters**

- `styles` - Style objects to shallow-merge in order.

**Returns**

- Merged style object with `undefined` entries skipped.

**Examples**

```ts
import { sx } from "varena";

sx({ padding: "8px", borderRadius: "8px" }, undefined, { padding: "12px", color: "white" });
// => { padding: "12px", borderRadius: "8px", color: "white" }
```

#### `isStyles(target)`

Type guard to check if a value is a `Styles` instance.

**Parameters**

- `target` - The value to check.

**Returns**

- `true` if the value is a `Styles` instance, narrowing the type in TypeScript.

**Examples**

```ts
import { isStyles, createStyles } from "varena";

const ButtonStyles = createStyles({ slots: { root: "btn" } });

isStyles(ButtonStyles);
// => true

isStyles({});
// => false

isStyles(null);
// => false
```

#### `isTokens(target)`

Type guard to check if a value is a `Tokens` instance.

**Parameters**

- `target` - The value to check.

**Returns**

- `true` if the value is a `Tokens` instance, narrowing the type in TypeScript.

**Examples**

```ts
import { isTokens, createTokens } from "varena";

const ThemeTokens = createTokens({ "color.primary": "#0ea5e9" });

isTokens(ThemeTokens);
// => true

isTokens({});
// => false

isTokens(null);
// => false
```

#### `InferStylesConfig<TStyles>`

Infers the full `createStyles` call config type.

**Input**

- `TStyles extends Styles<any, any>` - A `createStyles` return type.

**Output**

- `{ slots?: Partial<Slots<TSlotsValue>> | ((variants) => Partial<Slots<TSlotsValue>> | undefined); variants?: Partial<Variants<TSlotsValue, TVariantsValue>> }` - Full config shape accepted by `Styles(config)`.

**Examples**

```ts
import type { InferStylesConfig } from "varena";

export type ButtonStylesConfig = InferStylesConfig<typeof ButtonStyles>;
// => {
//   slots?: { root?: string; icon?: string } | ...;
//   variants?: { size?: "sm" | "lg"; tone?: "neutral" | "danger" };
// }
```

#### `ExtractStylesConfig<TStyles, TRules>`

Extracts matching slot keys from the `createStyles` config type.

**Input**

- `TStyles extends Styles<any, any>` - A `createStyles` return type.
- `TRules extends string` - A string literal type pattern to match slot keys.

**Output**

- `StylesConfig` with only the matching slot keys in `slots`.

**Examples**

```ts
import type { ExtractStylesConfig } from "varena";

export type IconOnlyButtonStylesConfig = ExtractStylesConfig<typeof ButtonStyles, "icon">;
// => {
//   slots?: { icon?: string } | ...;
//   variants?: { size?: "sm" | "lg"; tone?: "neutral" | "danger" };
// }
```

#### `ExcludeStylesConfig<TStyles, TRules>`

Excludes matching slot keys from the `createStyles` config type.

**Input**

- `TStyles extends Styles<any, any>` - A `createStyles` return type.
- `TRules extends string` - A string literal type pattern to exclude slot keys.

**Output**

- `StylesConfig` without the excluded slot keys in `slots`.

**Examples**

```ts
import type { ExcludeStylesConfig } from "varena";

export type WithoutIconButtonStylesConfig = ExcludeStylesConfig<typeof ButtonStyles, "icon">;
// => {
//   slots?: { root?: string } | ...;
//   variants?: { size?: "sm" | "lg"; tone?: "neutral" | "danger" };
// }
```

#### `InferComponentStylesConfig<TStyles>`

Infers a component-friendly flattened style config type.

**Input**

- `TStyles extends Styles<any, any>` - A `createStyles` return type.

**Output**

- `{ slots?: Partial<Slots<TSlotsValue>> | ((variants) => Partial<Slots<TSlotsValue>> | undefined); [variantName]?: VariantValue }` - Flattened component props style config.

**Examples**

```ts
import type { InferComponentStylesConfig } from "varena";

export type ButtonStylesConfig = InferComponentStylesConfig<typeof ButtonStyles>;
// => {
//   slots?: { root?: string; icon?: string } | ...;
//   size?: "sm" | "lg";
//   tone?: "neutral" | "danger";
// }
```

#### `ExtractComponentStylesConfig<TStyles, TRules>`

Extracts a component-friendly config type with only matching slots and flattened variants.

**Input**

- `TStyles extends Styles<any, any>` - A `createStyles` return type.
- `TRules extends string` - A string literal type pattern to match slot keys.

**Output**

- Flattened config type with only the matching slot keys in `slots`.

**Examples**

```ts
import type { ExtractComponentStylesConfig } from "varena";

export type IconOnlyButtonStylesConfig = ExtractComponentStylesConfig<typeof ButtonStyles, "icon">;
// => {
//   slots?: { icon?: string } | ...;
//   size?: "sm" | "lg";
//   tone?: "neutral" | "danger";
// }
```

#### `ExcludeComponentStylesConfig<TStyles, TRules>`

Excludes a component-friendly config type with excluded slots and flattened variants.

**Input**

- `TStyles extends Styles<any, any>` - A `createStyles` return type.
- `TRules extends string` - A string literal type pattern to exclude slot keys.

**Output**

- Flattened config type without the excluded slot keys in `slots`.

**Examples**

```ts
import type { ExcludeComponentStylesConfig } from "varena";

export type WithoutIconButtonStylesConfig = ExcludeComponentStylesConfig<
  typeof ButtonStyles,
  "icon"
>;
// => {
//   slots?: { root?: string } | ...;
//   size?: "sm" | "lg";
//   tone?: "neutral" | "danger";
// }
```

#### `InferTokensConfig<TTokens>`

Infers the config shape accepted by a `Tokens(config)` call.

**Input**

- `TTokens extends Tokens<any>` - A `createTokens` return type.

**Output**

- `Partial<TokensValue>` - Config shape accepted by `Tokens(config)`.

**Examples**

```ts
import type { InferTokensConfig } from "varena";

export type ThemeTokensConfig = InferTokensConfig<typeof ThemeTokens>;
// => { "color.primary"?: string; "color.secondary"?: string; "radius.md"?: string }
```

### varena/design-system

Design token systems for consistent foundations.

#### `AnimationTokens: Tokens<AnimationSystem>`

Animation durations and easing curves.

**System**

```ts
type AnimationSystem = {
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
```

#### `BorderTokens: Tokens<BorderSystem>`

Border radius scales.

**System**

```ts
type BorderSystem = {
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
```

#### `ColorTokens: Tokens<ColorSystem>`

Semantic colors for surfaces, text, and states.

**System**

```ts
type ColorSystem = {
  "color-background": string;
  "color-foreground": string;

  "color-brand": string;
  "color-brand-foreground": string;
  "color-primary": string;
  "color-primary-foreground": string;
  "color-secondary": string;
  "color-secondary-foreground": string;
  "color-accent": string;
  "color-accent-foreground": string;
  "color-muted": string;
  "color-muted-foreground": string;

  "color-danger": string;
  "color-danger-foreground": string;
  "color-warning": string;
  "color-warning-foreground": string;
  "color-success": string;
  "color-success-foreground": string;
  "color-info": string;
  "color-info-foreground": string;

  "color-border": string;
  "color-input": string;
  "color-ring": string;

  "color-card": string;
  "color-card-foreground": string;
  "color-popover": string;
  "color-popover-foreground": string;

  "color-sidebar": string;
  "color-sidebar-foreground": string;
  "color-sidebar-primary": string;
  "color-sidebar-primary-foreground": string;
  "color-sidebar-accent": string;
  "color-sidebar-accent-foreground": string;
  "color-sidebar-border": string;
  "color-sidebar-ring": string;

  "color-chart-1": string;
  "color-chart-2": string;
  "color-chart-3": string;
  "color-chart-4": string;
  "color-chart-5": string;
};
```

#### `EffectTokens: Tokens<EffectSystem>`

Shadow effects for boxes and text.

**System**

```ts
type EffectSystem = {
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
```

#### `FilterTokens: Tokens<FilterSystem>`

Visual filters like blur and drop shadow.

**System**

```ts
type FilterSystem = {
  "blur-none": string;
  "blur-xs": string;
  "blur-sm": string;
  "blur-md": string;
  "blur-lg": string;
  "blur-xl": string;
  "blur-2xl": string;
  "blur-3xl": string;

  "drop-shadow-none": string;
  "drop-shadow-xs": string;
  "drop-shadow-sm": string;
  "drop-shadow-md": string;
  "drop-shadow-lg": string;
  "drop-shadow-xl": string;
  "drop-shadow-2xl": string;
};
```

#### `InteractivityTokens: Tokens<InteractivitySystem>`

Interactive cursor styles.

**System**

```ts
type InteractivitySystem = {
  "cursor-interactive": string;
  "cursor-disabled": string;
};
```

#### `LayoutTokens: Tokens<LayoutSystem>`

Layout layers and proportions.

**System**

```ts
type LayoutSystem = {
  "z-hide": string;
  "z-base": string;
  "z-docked": string;
  "z-dropdown": string;
  "z-sticky": string;
  "z-banner": string;
  "z-overlay": string;
  "z-modal": string;
  "z-popover": string;
  "z-skip-nav": string;
  "z-toast": string;
  "z-tooltip": string;
  "z-max": string;

  "aspect-square": string;
  "aspect-landscape": string;
  "aspect-portrait": string;
  "aspect-wide": string;
  "aspect-ultrawide": string;
  "aspect-golden": string;
};
```

#### `PaletteTokens: Tokens<PaletteSystem>`

Color palette shades.

**System**

```ts
type PaletteSystem = {
  "color-black": string;
  "color-white": string;

  "color-red-50": string;
  "color-red-100": string;
  "color-red-200": string;
  "color-red-300": string;
  "color-red-400": string;
  "color-red-500": string;
  "color-red-600": string;
  "color-red-700": string;
  "color-red-800": string;
  "color-red-900": string;
  "color-red-950": string;

  "color-orange-50": string;
  "color-orange-100": string;
  "color-orange-200": string;
  "color-orange-300": string;
  "color-orange-400": string;
  "color-orange-500": string;
  "color-orange-600": string;
  "color-orange-700": string;
  "color-orange-800": string;
  "color-orange-900": string;
  "color-orange-950": string;

  "color-amber-50": string;
  "color-amber-100": string;
  "color-amber-200": string;
  "color-amber-300": string;
  "color-amber-400": string;
  "color-amber-500": string;
  "color-amber-600": string;
  "color-amber-700": string;
  "color-amber-800": string;
  "color-amber-900": string;
  "color-amber-950": string;

  "color-yellow-50": string;
  "color-yellow-100": string;
  "color-yellow-200": string;
  "color-yellow-300": string;
  "color-yellow-400": string;
  "color-yellow-500": string;
  "color-yellow-600": string;
  "color-yellow-700": string;
  "color-yellow-800": string;
  "color-yellow-900": string;
  "color-yellow-950": string;

  "color-lime-50": string;
  "color-lime-100": string;
  "color-lime-200": string;
  "color-lime-300": string;
  "color-lime-400": string;
  "color-lime-500": string;
  "color-lime-600": string;
  "color-lime-700": string;
  "color-lime-800": string;
  "color-lime-900": string;
  "color-lime-950": string;

  "color-green-50": string;
  "color-green-100": string;
  "color-green-200": string;
  "color-green-300": string;
  "color-green-400": string;
  "color-green-500": string;
  "color-green-600": string;
  "color-green-700": string;
  "color-green-800": string;
  "color-green-900": string;
  "color-green-950": string;

  "color-emerald-50": string;
  "color-emerald-100": string;
  "color-emerald-200": string;
  "color-emerald-300": string;
  "color-emerald-400": string;
  "color-emerald-500": string;
  "color-emerald-600": string;
  "color-emerald-700": string;
  "color-emerald-800": string;
  "color-emerald-900": string;
  "color-emerald-950": string;

  "color-teal-50": string;
  "color-teal-100": string;
  "color-teal-200": string;
  "color-teal-300": string;
  "color-teal-400": string;
  "color-teal-500": string;
  "color-teal-600": string;
  "color-teal-700": string;
  "color-teal-800": string;
  "color-teal-900": string;
  "color-teal-950": string;

  "color-cyan-50": string;
  "color-cyan-100": string;
  "color-cyan-200": string;
  "color-cyan-300": string;
  "color-cyan-400": string;
  "color-cyan-500": string;
  "color-cyan-600": string;
  "color-cyan-700": string;
  "color-cyan-800": string;
  "color-cyan-900": string;
  "color-cyan-950": string;

  "color-sky-50": string;
  "color-sky-100": string;
  "color-sky-200": string;
  "color-sky-300": string;
  "color-sky-400": string;
  "color-sky-500": string;
  "color-sky-600": string;
  "color-sky-700": string;
  "color-sky-800": string;
  "color-sky-900": string;
  "color-sky-950": string;

  "color-blue-50": string;
  "color-blue-100": string;
  "color-blue-200": string;
  "color-blue-300": string;
  "color-blue-400": string;
  "color-blue-500": string;
  "color-blue-600": string;
  "color-blue-700": string;
  "color-blue-800": string;
  "color-blue-900": string;
  "color-blue-950": string;

  "color-indigo-50": string;
  "color-indigo-100": string;
  "color-indigo-200": string;
  "color-indigo-300": string;
  "color-indigo-400": string;
  "color-indigo-500": string;
  "color-indigo-600": string;
  "color-indigo-700": string;
  "color-indigo-800": string;
  "color-indigo-900": string;
  "color-indigo-950": string;

  "color-violet-50": string;
  "color-violet-100": string;
  "color-violet-200": string;
  "color-violet-300": string;
  "color-violet-400": string;
  "color-violet-500": string;
  "color-violet-600": string;
  "color-violet-700": string;
  "color-violet-800": string;
  "color-violet-900": string;
  "color-violet-950": string;

  "color-purple-50": string;
  "color-purple-100": string;
  "color-purple-200": string;
  "color-purple-300": string;
  "color-purple-400": string;
  "color-purple-500": string;
  "color-purple-600": string;
  "color-purple-700": string;
  "color-purple-800": string;
  "color-purple-900": string;
  "color-purple-950": string;

  "color-fuchsia-50": string;
  "color-fuchsia-100": string;
  "color-fuchsia-200": string;
  "color-fuchsia-300": string;
  "color-fuchsia-400": string;
  "color-fuchsia-500": string;
  "color-fuchsia-600": string;
  "color-fuchsia-700": string;
  "color-fuchsia-800": string;
  "color-fuchsia-900": string;
  "color-fuchsia-950": string;

  "color-pink-50": string;
  "color-pink-100": string;
  "color-pink-200": string;
  "color-pink-300": string;
  "color-pink-400": string;
  "color-pink-500": string;
  "color-pink-600": string;
  "color-pink-700": string;
  "color-pink-800": string;
  "color-pink-900": string;
  "color-pink-950": string;

  "color-rose-50": string;
  "color-rose-100": string;
  "color-rose-200": string;
  "color-rose-300": string;
  "color-rose-400": string;
  "color-rose-500": string;
  "color-rose-600": string;
  "color-rose-700": string;
  "color-rose-800": string;
  "color-rose-900": string;
  "color-rose-950": string;

  "color-slate-50": string;
  "color-slate-100": string;
  "color-slate-200": string;
  "color-slate-300": string;
  "color-slate-400": string;
  "color-slate-500": string;
  "color-slate-600": string;
  "color-slate-700": string;
  "color-slate-800": string;
  "color-slate-900": string;
  "color-slate-950": string;

  "color-gray-50": string;
  "color-gray-100": string;
  "color-gray-200": string;
  "color-gray-300": string;
  "color-gray-400": string;
  "color-gray-500": string;
  "color-gray-600": string;
  "color-gray-700": string;
  "color-gray-800": string;
  "color-gray-900": string;
  "color-gray-950": string;

  "color-zinc-50": string;
  "color-zinc-100": string;
  "color-zinc-200": string;
  "color-zinc-300": string;
  "color-zinc-400": string;
  "color-zinc-500": string;
  "color-zinc-600": string;
  "color-zinc-700": string;
  "color-zinc-800": string;
  "color-zinc-900": string;
  "color-zinc-950": string;

  "color-neutral-50": string;
  "color-neutral-100": string;
  "color-neutral-200": string;
  "color-neutral-300": string;
  "color-neutral-400": string;
  "color-neutral-500": string;
  "color-neutral-600": string;
  "color-neutral-700": string;
  "color-neutral-800": string;
  "color-neutral-900": string;
  "color-neutral-950": string;

  "color-stone-50": string;
  "color-stone-100": string;
  "color-stone-200": string;
  "color-stone-300": string;
  "color-stone-400": string;
  "color-stone-500": string;
  "color-stone-600": string;
  "color-stone-700": string;
  "color-stone-800": string;
  "color-stone-900": string;
  "color-stone-950": string;

  "color-mauve-50": string;
  "color-mauve-100": string;
  "color-mauve-200": string;
  "color-mauve-300": string;
  "color-mauve-400": string;
  "color-mauve-500": string;
  "color-mauve-600": string;
  "color-mauve-700": string;
  "color-mauve-800": string;
  "color-mauve-900": string;
  "color-mauve-950": string;

  "color-olive-50": string;
  "color-olive-100": string;
  "color-olive-200": string;
  "color-olive-300": string;
  "color-olive-400": string;
  "color-olive-500": string;
  "color-olive-600": string;
  "color-olive-700": string;
  "color-olive-800": string;
  "color-olive-900": string;
  "color-olive-950": string;

  "color-mist-50": string;
  "color-mist-100": string;
  "color-mist-200": string;
  "color-mist-300": string;
  "color-mist-400": string;
  "color-mist-500": string;
  "color-mist-600": string;
  "color-mist-700": string;
  "color-mist-800": string;
  "color-mist-900": string;
  "color-mist-950": string;

  "color-taupe-50": string;
  "color-taupe-100": string;
  "color-taupe-200": string;
  "color-taupe-300": string;
  "color-taupe-400": string;
  "color-taupe-500": string;
  "color-taupe-600": string;
  "color-taupe-700": string;
  "color-taupe-800": string;
  "color-taupe-900": string;
  "color-taupe-950": string;
};
```

#### `SpacingTokens: Tokens<SpacingSystem>`

Spacing scales.

**System**

```ts
type SpacingSystem = {
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
```

#### `TypographyTokens: Tokens<TypographySystem>`

Typography fonts and scales.

**System**

```ts
type TypographySystem = {
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
```

#### `DesignTokens: Tokens<DesignSystem>`

Ready-to-use preset of design tokens.

**System**

```ts
type DesignSystem = AnimationSystem &
  BorderSystem &
  ColorSystem &
  EffectSystem &
  FilterSystem &
  InteractivitySystem &
  LayoutSystem &
  PaletteSystem &
  SpacingSystem &
  TypographySystem;
```

## License

MIT
