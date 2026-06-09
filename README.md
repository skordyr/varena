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
injectGlobal(ThemeTokens.css(":root"));
```

```tsx
// Use theme tokens with CSS-in-JS
import { css } from "@emotion/css";

// Note: `@/` is a path alias, use your project's import path
import { ThemeTokens } from "@/styles/theme";

// Color tokens use space-separated HSL values, supporting opacity via CSS hsl()
css`
  background-color: hsl(${ThemeTokens.variable("color-danger")} / 0.1);
  color: hsl(${ThemeTokens.variable("color-danger")});
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
    result[key as keyof ColorSystem] = `hsl(${ThemeTokens.variable(key as keyof ColorSystem)})`;

    return result;
  }, {}),
  "@theme inline",
)}
${ThemeTokens.css(":root")}
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
- `Tokens.css()` - Returns a formatted CSS string of token declarations without a selector.
- `Tokens.css(selector, wrapper?)` - Returns a formatted CSS string wrapped in a CSS selector for creating CSS files.
- `Tokens.css(config)` - Returns a formatted CSS string with only the specified CSS custom property overrides, without a selector.
- `Tokens.css(config, selector, wrapper?)` - Returns a formatted CSS string with only the specified CSS custom property overrides, wrapped in a CSS selector.
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
// --app-color-primary: #0ea5e9;
// --app-radius-md: 8px;

ThemeTokens.css(":root");
// =>
// :root {
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
// --app-radius-md: 8px;
// --app-color-primary: #ff0000;

ThemeTokens.css({ ...ThemeTokens.definition, "color.primary": "#ff0000" }, ":root");
// =>
// :root {
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
  "duration-fastest": string; //  50ms
  "duration-faster": string; //   100ms
  "duration-fast": string; //     150ms
  "duration-normal": string; //   200ms
  "duration-slow": string; //     300ms
  "duration-slower": string; //   400ms
  "duration-slowest": string; //  500ms

  "ease-linear": string; //       linear
  "ease-in": string; //           cubic-bezier(0.4, 0, 1, 1)
  "ease-out": string; //          cubic-bezier(0, 0, 0.2, 1)
  "ease-in-out": string; //       cubic-bezier(0.4, 0, 0.2, 1)
};
```

#### `BorderTokens: Tokens<BorderSystem>`

Border radius scales.

**System**

```ts
type BorderSystem = {
  radius: string; //        0.5rem
  "radius-none": string; // 0
  "radius-xs": string; //   0.125rem
  "radius-sm": string; //   0.25rem
  "radius-md": string; //   0.375rem
  "radius-lg": string; //   0.5rem
  "radius-xl": string; //   0.75rem
  "radius-2xl": string; //  1rem
  "radius-3xl": string; //  1.5rem
  "radius-4xl": string; //  2rem
  "radius-full": string; // 9999px
};
```

#### `ColorTokens: Tokens<ColorSystem>`

Semantic colors for surfaces, text, and states.

**System**

```ts
type ColorSystem = {
  "color-background": string; //                   0 0% 100%            // color-white      :hsl(0 0% 100%)
  "color-foreground": string; //                   0 0% 3.94%           // color-neutral-950:hsl(0 0% 3.94%)

  "color-brand": string; //                        0 0% 9.05%           // color-neutral-900:hsl(0 0% 9.05%)
  "color-brand-foreground": string; //             0 0% 98.03%          // color-neutral-50 :hsl(0 0% 98.03%)
  "color-primary": string; //                      0 0% 9.05%           // color-neutral-900:hsl(0 0% 9.05%)
  "color-primary-foreground": string; //           0 0% 98.03%          // color-neutral-50 :hsl(0 0% 98.03%)
  "color-secondary": string; //                    0 0% 96.06%          // color-neutral-100:hsl(0 0% 96.06%)
  "color-secondary-foreground": string; //         0 0% 9.05%           // color-neutral-900:hsl(0 0% 9.05%)
  "color-muted": string; //                        0 0% 96.06%          // color-neutral-100:hsl(0 0% 96.06%)
  "color-muted-foreground": string; //             0 0% 45.15%          // color-neutral-500:hsl(0 0% 45.15%)
  "color-accent": string; //                       0 0% 96.06%          // color-neutral-100:hsl(0 0% 96.06%)
  "color-accent-foreground": string; //            0 0% 9.05%           // color-neutral-900:hsl(0 0% 9.05%)

  "color-danger": string; //                       357.21 100% 45.32%   // color-red-600    :hsl(357.21 100% 45.32%)
  "color-danger-foreground": string; //            0 0% 98.03%          // color-neutral-50 :hsl(0 0% 98.03%)
  "color-warning": string; //                      30.1 100% 44.19%     // color-amber-600  :hsl(30.1 100% 44.19%)
  "color-warning-foreground": string; //           0 0% 98.03%          // color-neutral-50 :hsl(0 0% 98.03%)
  "color-success": string; //                      142.29 100% 32.57%   // color-green-600  :hsl(142.29 100% 32.57%)
  "color-success-foreground": string; //           0 0% 98.03%          // color-neutral-50 :hsl(0 0% 98.03%)
  "color-info": string; //                         221.34 97.06% 53.5%  // color-blue-600   :hsl(221.34 97.06% 53.5%)
  "color-info-foreground": string; //              0 0% 98.03%          // color-neutral-50 :hsl(0 0% 98.03%)

  "color-border": string; //                       0 0% 89.82%          // color-neutral-200:hsl(0 0% 89.82%)
  "color-input": string; //                        0 0% 89.82%          // color-neutral-200:hsl(0 0% 89.82%)
  "color-ring": string; //                         0 0% 63.02%          // color-neutral-400:hsl(0 0% 63.02%)

  "color-card": string; //                         0 0% 100%            // color-white      :hsl(0 0% 100%)
  "color-card-foreground": string; //              0 0% 3.94%           // color-neutral-950:hsl(0 0% 3.94%)
  "color-popover": string; //                      0 0% 100%            // color-white      :hsl(0 0% 100%)
  "color-popover-foreground": string; //           0 0% 3.94%           // color-neutral-950:hsl(0 0% 3.94%)

  "color-sidebar": string; //                      0 0% 98.03%          // color-neutral-50 :hsl(0 0% 98.03%)
  "color-sidebar-foreground": string; //           0 0% 3.94%           // color-neutral-950:hsl(0 0% 3.94%)
  "color-sidebar-primary": string; //              0 0% 9.05%           // color-neutral-900:hsl(0 0% 9.05%)
  "color-sidebar-primary-foreground": string; //   0 0% 98.03%          // color-neutral-50 :hsl(0 0% 98.03%)
  "color-sidebar-accent": string; //               0 0% 96.06%          // color-neutral-100:hsl(0 0% 96.06%)
  "color-sidebar-accent-foreground": string; //    0 0% 9.05%           // color-neutral-900:hsl(0 0% 9.05%)
  "color-sidebar-border": string; //               0 0% 89.82%          // color-neutral-200:hsl(0 0% 89.82%)
  "color-sidebar-ring": string; //                 0 0% 63.02%          // color-neutral-400:hsl(0 0% 63.02%)

  "color-chart-1": string; //                      210.69 100% 77.83%   // color-blue-300   :hsl(210.69 100% 77.83%)
  "color-chart-2": string; //                      216.26 100% 58.47%   // color-blue-500   :hsl(216.26 100% 58.47%)
  "color-chart-3": string; //                      221.34 97.06% 53.5%  // color-blue-600   :hsl(221.34 97.06% 53.5%)
  "color-chart-4": string; //                      225.35 84.1% 48.98%  // color-blue-700   :hsl(225.35 84.1% 48.98%)
  "color-chart-5": string; //                      227.1 75.74% 41.14%  // color-blue-800   :hsl(227.1 75.74% 41.14%)
};
```

#### `EffectTokens: Tokens<EffectSystem>`

Shadow effects for boxes and text.

**System**

```ts
type EffectSystem = {
  "shadow-none": string; //       0 0 #0000
  "shadow-2xs": string; //        0 1px rgb(0 0 0 / 0.05)
  "shadow-xs": string; //         0 1px 2px 0 rgb(0 0 0 / 0.05)
  "shadow-sm": string; //         0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
  "shadow-md": string; //         0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
  "shadow-lg": string; //         0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
  "shadow-xl": string; //         0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
  "shadow-2xl": string; //        0 25px 50px -12px rgb(0 0 0 / 0.25)

  "inset-shadow-none": string; // inset 0 0 #0000
  "inset-shadow-2xs": string; //  inset 0 1px rgb(0 0 0 / 0.05)
  "inset-shadow-xs": string; //   inset 0 1px 1px rgb(0 0 0 / 0.05)
  "inset-shadow-sm": string; //   inset 0 2px 4px rgb(0 0 0 / 0.05)

  "text-shadow-none": string; //  none
  "text-shadow-2xs": string; //   0px 1px 0px rgb(0 0 0 / 0.15)
  "text-shadow-xs": string; //    0px 1px 1px rgb(0 0 0 / 0.2)
  "text-shadow-sm": string; //    0px 1px 0px rgb(0 0 0 / 0.075), 0px 1px 1px rgb(0 0 0 / 0.075), 0px 2px 2px rgb(0 0 0 / 0.075)
  "text-shadow-md": string; //    0px 1px 1px rgb(0 0 0 / 0.1), 0px 1px 2px rgb(0 0 0 / 0.1), 0px 2px 4px rgb(0 0 0 / 0.1)
  "text-shadow-lg": string; //    0px 1px 2px rgb(0 0 0 / 0.1), 0px 3px 2px rgb(0 0 0 / 0.1), 0px 4px 8px rgb(0 0 0 / 0.1)
};
```

#### `FilterTokens: Tokens<FilterSystem>`

Visual filters like blur and drop shadow.

**System**

```ts
type FilterSystem = {
  "blur-none": string; //         ""
  "blur-xs": string; //           4px
  "blur-sm": string; //           8px
  "blur-md": string; //           12px
  "blur-lg": string; //           16px
  "blur-xl": string; //           24px
  "blur-2xl": string; //          40px
  "blur-3xl": string; //          64px

  "drop-shadow-none": string; //  0 0 #0000
  "drop-shadow-xs": string; //    0 1px 1px rgb(0 0 0 / 0.05)
  "drop-shadow-sm": string; //    0 1px 2px rgb(0 0 0 / 0.15)
  "drop-shadow-md": string; //    0 3px 3px rgb(0 0 0 / 0.12)
  "drop-shadow-lg": string; //    0 4px 4px rgb(0 0 0 / 0.15)
  "drop-shadow-xl": string; //    0 9px 7px rgb(0 0 0 / 0.1)
  "drop-shadow-2xl": string; //   0 25px 25px rgb(0 0 0 / 0.15)
};
```

#### `InteractivityTokens: Tokens<InteractivitySystem>`

Interactive cursor styles.

**System**

```ts
type InteractivitySystem = {
  "cursor-interactive": string; //  pointer
  "cursor-disabled": string; //     not-allowed
};
```

#### `LayoutTokens: Tokens<LayoutSystem>`

Layout layers and proportions.

**System**

```ts
type LayoutSystem = {
  "z-hide": string; //            -1
  "z-base": string; //            0
  "z-docked": string; //          10
  "z-dropdown": string; //        1000
  "z-sticky": string; //          1100
  "z-banner": string; //          1200
  "z-overlay": string; //         1300
  "z-modal": string; //           1400
  "z-popover": string; //         1500
  "z-skip-nav": string; //        1600
  "z-toast": string; //           1700
  "z-tooltip": string; //         1800
  "z-max": string; //             2147483647

  "aspect-square": string; //     1 / 1
  "aspect-landscape": string; //  4 / 3
  "aspect-portrait": string; //   3 / 4
  "aspect-wide": string; //       16 / 9
  "aspect-ultrawide": string; //  18 / 5
  "aspect-golden": string; //     1.618 / 1
};
```

#### `PaletteTokens: Tokens<PaletteSystem>`

Color palette shades.

**System**

```ts
type PaletteSystem = {
  "color-black": string; //       :hsl(0 0% 0%)
  "color-white": string; //       :hsl(0 0% 100%)

  "color-red-50": string; //      :hsl(0 88.21% 97.32%)
  "color-red-100": string; //     :hsl(359.98 98.78% 94.25%)
  "color-red-200": string; //     :hsl(359.95 100% 89.49%)
  "color-red-300": string; //     :hsl(359.72 100% 81.73%)
  "color-red-400": string; //     :hsl(358.75 100% 69.56%)
  "color-red-500": string; //     :hsl(356.95 95.9% 57.72%)
  "color-red-600": string; //     :hsl(357.21 100% 45.32%)
  "color-red-700": string; //     :hsl(357.72 100% 37.84%)
  "color-red-800": string; //     :hsl(355.94 91.15% 32.55%)
  "color-red-900": string; //     :hsl(358.8 69.3% 30.07%)
  "color-red-950": string; //     :hsl(359.29 79.42% 15.35%)

  "color-orange-50": string; //   :hsl(33.75 100% 96.46%)
  "color-orange-100": string; //  :hsl(34.51 100% 91.63%)
  "color-orange-200": string; //  :hsl(32.22 100% 82.84%)
  "color-orange-300": string; //  :hsl(31.57 100% 70.7%)
  "color-orange-400": string; //  :hsl(31.83 100% 50.69%)
  "color-orange-500": string; //  :hsl(24.64 100% 50%)
  "color-orange-600": string; //  :hsl(18 100% 48.04%)
  "color-orange-700": string; //  :hsl(15.7 100% 39.59%)
  "color-orange-800": string; //  :hsl(16.97 100% 31.22%)
  "color-orange-900": string; //  :hsl(15.99 83.12% 27.04%)
  "color-orange-950": string; //  :hsl(12.88 84.81% 14.42%)

  "color-amber-50": string; //    :hsl(48.38 100% 96%)
  "color-amber-100": string; //   :hsl(47.99 97.34% 88.73%)
  "color-amber-200": string; //   :hsl(48.02 98.23% 75.9%)
  "color-amber-300": string; //   :hsl(46.99 100% 59.38%)
  "color-amber-400": string; //   :hsl(43.65 100% 50%)
  "color-amber-500": string; //   :hsl(36.49 100% 49.6%)
  "color-amber-600": string; //   :hsl(30.1 100% 44.19%)
  "color-amber-700": string; //   :hsl(24.68 100% 36.59%)
  "color-amber-800": string; //   :hsl(23.76 100% 29.52%)
  "color-amber-900": string; //   :hsl(23.04 90.17% 25.26%)
  "color-amber-950": string; //   :hsl(20.9 96.65% 13.94%)

  "color-yellow-50": string; //   :hsl(54.55 90.61% 95.28%)
  "color-yellow-100": string; //  :hsl(54.89 97.52% 87.84%)
  "color-yellow-200": string; //  :hsl(52.74 99.45% 76.08%)
  "color-yellow-300": string; //  :hsl(51.51 100% 56.29%)
  "color-yellow-400": string; //  :hsl(47.61 100% 49.38%)
  "color-yellow-500": string; //  :hsl(44.37 100% 46.93%)
  "color-yellow-600": string; //  :hsl(38.87 100% 40.88%)
  "color-yellow-700": string; //  :hsl(34.39 100% 32.55%)
  "color-yellow-800": string; //  :hsl(32.77 100% 26.8%)
  "color-yellow-900": string; //  :hsl(29.52 83.35% 24.57%)
  "color-yellow-950": string; //  :hsl(26.16 87.52% 13.96%)

  "color-lime-50": string; //     :hsl(78.26 92.84% 95.14%)
  "color-lime-100": string; //    :hsl(79.56 89.72% 89.11%)
  "color-lime-200": string; //    :hsl(80.7 89.71% 78.91%)
  "color-lime-300": string; //    :hsl(80.92 87.66% 63.65%)
  "color-lime-400": string; //    :hsl(79.91 100% 45.08%)
  "color-lime-500": string; //    :hsl(83.9 100% 40.5%)
  "color-lime-600": string; //    :hsl(85.83 100% 32.37%)
  "color-lime-700": string; //    :hsl(85.23 100% 24.58%)
  "color-lime-800": string; //    :hsl(83.32 100% 19.4%)
  "color-lime-900": string; //    :hsl(86.52 71.11% 19.12%)
  "color-lime-950": string; //    :hsl(88.95 88.62% 9.61%)

  "color-green-50": string; //    :hsl(138.46 76.51% 96.68%)
  "color-green-100": string; //   :hsl(140.65 84.38% 92.45%)
  "color-green-200": string; //   :hsl(141.14 81.07% 84.82%)
  "color-green-300": string; //   :hsl(142.66 81.25% 71.39%)
  "color-green-400": string; //   :hsl(150.06 95.56% 44.76%)
  "color-green-500": string; //   :hsl(144.06 100% 39.36%)
  "color-green-600": string; //   :hsl(142.29 100% 32.57%)
  "color-green-700": string; //   :hsl(144.68 100% 25.5%)
  "color-green-800": string; //   :hsl(147.72 97.15% 20.36%)
  "color-green-900": string; //   :hsl(145.73 73.08% 18.99%)
  "color-green-950": string; //   :hsl(145.39 87.57% 9.65%)

  "color-emerald-50": string; //  :hsl(151.78 80.95% 95.82%)
  "color-emerald-100": string; // :hsl(149.32 81.17% 89.84%)
  "color-emerald-200": string; // :hsl(152.54 77.89% 80.02%)
  "color-emerald-300": string; // :hsl(157.3 76.25% 64.25%)
  "color-emerald-400": string; // :hsl(161.25 100% 41.63%)
  "color-emerald-500": string; // :hsl(159.74 100% 36.94%)
  "color-emerald-600": string; // :hsl(159.97 100% 29.95%)
  "color-emerald-700": string; // :hsl(161.85 100% 23.91%)
  "color-emerald-800": string; // :hsl(162.98 100% 18.89%)
  "color-emerald-900": string; // :hsl(164.76 100% 15.41%)
  "color-emerald-950": string; // :hsl(165.88 100% 8.68%)

  "color-teal-50": string; //     :hsl(166.15 77.06% 96.74%)
  "color-teal-100": string; //    :hsl(167.27 86.98% 89.13%)
  "color-teal-200": string; //    :hsl(168.51 85.39% 77.72%)
  "color-teal-300": string; //    :hsl(171.35 81.79% 60.15%)
  "color-teal-400": string; //    :hsl(173.4 100% 41.76%)
  "color-teal-500": string; //    :hsl(173.58 100% 36.67%)
  "color-teal-600": string; //    :hsl(174.71 100% 29.46%)
  "color-teal-700": string; //    :hsl(175.65 100% 23.45%)
  "color-teal-800": string; //    :hsl(176.62 100% 18.66%)
  "color-teal-900": string; //    :hsl(176.3 76.01% 17.51%)
  "color-teal-950": string; //    :hsl(178.66 91.58% 9.64%)

  "color-cyan-50": string; //     :hsl(183.16 99.92% 96.25%)
  "color-cyan-100": string; //    :hsl(185.11 96.43% 90.29%)
  "color-cyan-200": string; //    :hsl(186.2 95.77% 81.44%)
  "color-cyan-300": string; //    :hsl(186.71 97.47% 65.9%)
  "color-cyan-400": string; //    :hsl(187.8 100% 47.55%)
  "color-cyan-500": string; //    :hsl(189.48 100% 42.87%)
  "color-cyan-600": string; //    :hsl(192.32 100% 36.13%)
  "color-cyan-700": string; //    :hsl(192.78 100% 29.16%)
  "color-cyan-800": string; //    :hsl(192.74 100% 23.56%)
  "color-cyan-900": string; //    :hsl(195.82 72.14% 22.87%)
  "color-cyan-950": string; //    :hsl(196.69 85.44% 14.55%)

  "color-sky-50": string; //      :hsl(203.34 100% 96.99%)
  "color-sky-100": string; //     :hsl(203.99 96.54% 93.67%)
  "color-sky-200": string; //     :hsl(200.57 97.87% 85.94%)
  "color-sky-300": string; //     :hsl(198.47 100% 72.66%)
  "color-sky-400": string; //     :hsl(195.82 100% 50%)
  "color-sky-500": string; //     :hsl(199.27 100% 47.86%)
  "color-sky-600": string; //     :hsl(202.08 100% 40.99%)
  "color-sky-700": string; //     :hsl(202.6 100% 33.01%)
  "color-sky-800": string; //     :hsl(201.21 100% 26.99%)
  "color-sky-900": string; //     :hsl(200.84 96.98% 22.39%)
  "color-sky-950": string; //     :hsl(203.63 87.23% 15.52%)

  "color-blue-50": string; //     :hsl(213.75 96.48% 96.79%)
  "color-blue-100": string; //    :hsl(214.28 96.22% 92.78%)
  "color-blue-200": string; //    :hsl(213.27 100% 87.25%)
  "color-blue-300": string; //    :hsl(210.69 100% 77.83%)
  "color-blue-400": string; //    :hsl(211.96 100% 65.79%)
  "color-blue-500": string; //    :hsl(216.26 100% 58.47%)
  "color-blue-600": string; //    :hsl(221.34 97.06% 53.5%)
  "color-blue-700": string; //    :hsl(225.35 84.1% 48.98%)
  "color-blue-800": string; //    :hsl(227.1 75.74% 41.14%)
  "color-blue-900": string; //    :hsl(224.86 67.28% 33.33%)
  "color-blue-950": string; //    :hsl(226.51 58.74% 21.15%)

  "color-indigo-50": string; //   :hsl(225.82 100% 96.67%)
  "color-indigo-100": string; //  :hsl(226.28 100% 93.9%)
  "color-indigo-200": string; //  :hsl(227.86 100% 88.92%)
  "color-indigo-300": string; //  :hsl(229.52 100% 81.96%)
  "color-indigo-400": string; //  :hsl(235.47 100% 74.39%)
  "color-indigo-500": string; //  :hsl(240.98 100% 68.59%)
  "color-indigo-600": string; //  :hsl(246.99 91.66% 59.53%)
  "color-indigo-700": string; //  :hsl(247.88 68.29% 51.07%)
  "color-indigo-800": string; //  :hsl(246.14 60.99% 41.85%)
  "color-indigo-900": string; //  :hsl(243.26 50.34% 34.77%)
  "color-indigo-950": string; //  :hsl(244.4 49.1% 20.16%)

  "color-violet-50": string; //   :hsl(250 98.58% 97.62%)
  "color-violet-100": string; //  :hsl(251.44 93.48% 95.5%)
  "color-violet-200": string; //  :hsl(250.61 100% 91.89%)
  "color-violet-300": string; //  :hsl(253.4 100% 85.2%)
  "color-violet-400": string; //  :hsl(256.85 100% 75.85%)
  "color-violet-500": string; //  :hsl(260.92 100% 65.91%)
  "color-violet-600": string; //  :hsl(265.48 99.08% 56.49%)
  "color-violet-700": string; //  :hsl(268 93.3% 46.89%)
  "color-violet-800": string; //  :hsl(266.64 86.27% 40.44%)
  "color-violet-900": string; //  :hsl(264.88 74.27% 34.64%)
  "color-violet-950": string; //  :hsl(262.22 77.74% 22.86%)

  "color-purple-50": string; //   :hsl(270 98.85% 98.04%)
  "color-purple-100": string; //  :hsl(268.7 99.95% 95.45%)
  "color-purple-200": string; //  :hsl(269.45 100% 91.65%)
  "color-purple-300": string; //  :hsl(271.09 100% 84.89%)
  "color-purple-400": string; //  :hsl(272.27 100% 73.99%)
  "color-purple-500": string; //  :hsl(273.31 100% 63.8%)
  "color-purple-600": string; //  :hsl(274.91 96.1% 52.15%)
  "color-purple-700": string; //  :hsl(275.69 100% 42.86%)
  "color-purple-800": string; //  :hsl(274.93 82.4% 37.87%)
  "color-purple-900": string; //  :hsl(274.52 72.39% 31.62%)
  "color-purple-950": string; //  :hsl(274.32 94.3% 20.66%)

  "color-fuchsia-50": string; //  :hsl(289.09 95.95% 97.79%)
  "color-fuchsia-100": string; // :hsl(287.85 100% 95.45%)
  "color-fuchsia-200": string; // :hsl(288.42 100% 90.67%)
  "color-fuchsia-300": string; // :hsl(292.14 100% 82.86%)
  "color-fuchsia-400": string; // :hsl(292.78 100% 70.88%)
  "color-fuchsia-500": string; // :hsl(292.61 96.35% 57.51%)
  "color-fuchsia-600": string; // :hsl(293.95 100% 43.58%)
  "color-fuchsia-700": string; // :hsl(295.03 100% 35.9%)
  "color-fuchsia-800": string; // :hsl(295.8 98.24% 29.35%)
  "color-fuchsia-900": string; // :hsl(296.7 72.35% 27.25%)
  "color-fuchsia-950": string; // :hsl(296.75 99.06% 15.6%)

  "color-pink-50": string; //     :hsl(327.28 71.09% 97%)
  "color-pink-100": string; //    :hsl(325.7 78.63% 94.7%)
  "color-pink-200": string; //    :hsl(325.85 87.87% 89.84%)
  "color-pink-300": string; //    :hsl(327.09 96.71% 82.03%)
  "color-pink-400": string; //    :hsl(327.47 95.38% 68.88%)
  "color-pink-500": string; //    :hsl(328.25 91.82% 58.2%)
  "color-pink-600": string; //    :hsl(329.15 100% 45.07%)
  "color-pink-700": string; //    :hsl(332.31 100% 38.89%)
  "color-pink-800": string; //    :hsl(332 100% 31.93%)
  "color-pink-900": string; //    :hsl(334.27 78.49% 29.42%)
  "color-pink-950": string; //    :hsl(335.29 90.94% 16.65%)

  "color-rose-50": string; //     :hsl(355.72 96.53% 97.19%)
  "color-rose-100": string; //    :hsl(355.55 100% 94.67%)
  "color-rose-200": string; //    :hsl(352.59 100% 90.06%)
  "color-rose-300": string; //    :hsl(351.96 100% 81.5%)
  "color-rose-400": string; //    :hsl(349.65 100% 69.44%)
  "color-rose-500": string; //    :hsl(345.31 100% 56.23%)
  "color-rose-600": string; //    :hsl(343.91 100% 46.37%)
  "color-rose-700": string; //    :hsl(343.76 100% 38.93%)
  "color-rose-800": string; //    :hsl(340.36 100% 32.33%)
  "color-rose-900": string; //    :hsl(338.93 89.54% 28.73%)
  "color-rose-950": string; //    :hsl(342.26 94.35% 15.6%)

  "color-slate-50": string; //    :hsl(210 34.55% 98%)
  "color-slate-100": string; //   :hsl(210 40.55% 96.05%)
  "color-slate-200": string; //   :hsl(214.28 32.97% 91.42%)
  "color-slate-300": string; //   :hsl(212.72 29.91% 84.02%)
  "color-slate-400": string; //   :hsl(214.99 22.59% 64.5%)
  "color-slate-500": string; //   :hsl(215.38 18.37% 47.03%)
  "color-slate-600": string; //   :hsl(215.29 22.04% 34.76%)
  "color-slate-700": string; //   :hsl(215.29 27.93% 26.85%)
  "color-slate-800": string; //   :hsl(217.28 36.07% 17.54%)
  "color-slate-900": string; //   :hsl(222.34 49.39% 11.3%)
  "color-slate-950": string; //   :hsl(228.82 85.13% 5%)

  "color-gray-50": string; //     :hsl(210 24.19% 98.1%)
  "color-gray-100": string; //    :hsl(220 14.97% 95.9%)
  "color-gray-200": string; //    :hsl(220 13.57% 91.05%)
  "color-gray-300": string; //    :hsl(216 13.12% 84%)
  "color-gray-400": string; //    :hsl(217.9 11.92% 64.26%)
  "color-gray-500": string; //    :hsl(220.03 10.26% 46.3%)
  "color-gray-600": string; //    :hsl(214.99 15.66% 34.25%)
  "color-gray-700": string; //    :hsl(216.94 21.1% 26.81%)
  "color-gray-800": string; //    :hsl(214.99 30.99% 16.95%)
  "color-gray-900": string; //    :hsl(221 41.69% 11.07%)
  "color-gray-950": string; //    :hsl(224.05 72.24% 4.17%)

  "color-zinc-50": string; //     :hsl(0 0% 98.03%)
  "color-zinc-100": string; //    :hsl(239.99 3.51% 95.79%)
  "color-zinc-200": string; //    :hsl(240 5.86% 90.03%)
  "color-zinc-300": string; //    :hsl(240.02 5.38% 83.97%)
  "color-zinc-400": string; //    :hsl(240.08 5.71% 64.3%)
  "color-zinc-500": string; //    :hsl(240.1 4.41% 46.34%)
  "color-zinc-600": string; //    :hsl(240.13 6% 34.16%)
  "color-zinc-700": string; //    :hsl(240.08 5.74% 26.15%)
  "color-zinc-800": string; //    :hsl(240.05 4.04% 15.93%)
  "color-zinc-900": string; //    :hsl(240.02 6.03% 9.98%)
  "color-zinc-950": string; //    :hsl(240.1 11.24% 3.98%)

  "color-neutral-50": string; //  :hsl(0 0% 98.03%)
  "color-neutral-100": string; // :hsl(0 0% 96.06%)
  "color-neutral-200": string; // :hsl(0 0% 89.82%)
  "color-neutral-300": string; // :hsl(0 0% 83.14%)
  "color-neutral-400": string; // :hsl(0 0% 63.02%)
  "color-neutral-500": string; // :hsl(0 0% 45.15%)
  "color-neutral-600": string; // :hsl(0 0% 32.2%)
  "color-neutral-700": string; // :hsl(0 0% 25.05%)
  "color-neutral-800": string; // :hsl(0 0% 14.94%)
  "color-neutral-900": string; // :hsl(0 0% 9.05%)
  "color-neutral-950": string; // :hsl(0 0% 3.94%)

  "color-stone-50": string; //    :hsl(60.01 7.09% 97.9%)
  "color-stone-100": string; //   :hsl(60.01 3.65% 95.94%)
  "color-stone-200": string; //   :hsl(20 6.87% 89.98%)
  "color-stone-300": string; //   :hsl(24.01 6.69% 82.98%)
  "color-stone-400": string; //   :hsl(24.01 5.85% 63.05%)
  "color-stone-500": string; //   :hsl(25.02 5.9% 44.64%)
  "color-stone-600": string; //   :hsl(33.35 6.28% 32.24%)
  "color-stone-700": string; //   :hsl(30.02 7.22% 25.04%)
  "color-stone-800": string; //   :hsl(12 7.23% 15.07%)
  "color-stone-900": string; //   :hsl(24 9.61% 9.99%)
  "color-stone-950": string; //   :hsl(20.04 13.84% 4.13%)

  "color-mauve-50": string; //    :hsl(0 0% 98.03%)
  "color-mauve-100": string; //   :hsl(300 6.75% 94.86%)
  "color-mauve-200": string; //   :hsl(300.01 5.72% 89.99%)
  "color-mauve-300": string; //   :hsl(300 7.91% 82.91%)
  "color-mauve-400": string; //   :hsl(294.55 5.88% 64.08%)
  "color-mauve-500": string; //   :hsl(293.32 7.97% 44.71%)
  "color-mauve-600": string; //   :hsl(292.01 8.87% 32.73%)
  "color-mauve-700": string; //   :hsl(295.73 10.8% 25.11%)
  "color-mauve-800": string; //   :hsl(289.09 14.31% 15.11%)
  "color-mauve-900": string; //   :hsl(292.5 15.61% 10.17%)
  "color-mauve-950": string; //   :hsl(300.04 13.94% 4.1%)

  "color-olive-50": string; //    :hsl(60.06 22.98% 98.06%)
  "color-olive-100": string; //   :hsl(60.01 14.61% 94.93%)
  "color-olive-200": string; //   :hsl(59.95 10.3% 90.01%)
  "color-olive-300": string; //   :hsl(59.97 9.45% 83.12%)
  "color-olive-400": string; //   :hsl(59.99 8.17% 64.13%)
  "color-olive-500": string; //   :hsl(59.96 9.27% 44.48%)
  "color-olive-600": string; //   :hsl(59.96 9.68% 32.51%)
  "color-olive-700": string; //   :hsl(59.99 11.08% 25.12%)
  "color-olive-800": string; //   :hsl(60.04 11.83% 15.08%)
  "color-olive-900": string; //   :hsl(60.02 13.73% 9.98%)
  "color-olive-950": string; //   :hsl(60.02 13.63% 4.13%)

  "color-mist-50": string; //     :hsl(179.98 19.51% 98.11%)
  "color-mist-100": string; //    :hsl(179.98 7.29% 94.96%)
  "color-mist-200": string; //    :hsl(191.98 10.78% 89.95%)
  "color-mist-300": string; //    :hsl(195.02 9.15% 83.14%)
  "color-mist-400": string; //    :hsl(192.01 8.04% 64.13%)
  "color-mist-500": string; //    :hsl(191.43 9.22% 44.49%)
  "color-mist-600": string; //    :hsl(191.25 9.66% 32.52%)
  "color-mist-700": string; //    :hsl(192.85 10.76% 25.12%)
  "color-mist-800": string; //    :hsl(193.35 12.19% 15.09%)
  "color-mist-900": string; //    :hsl(197.18 12.89% 10.03%)
  "color-mist-950": string; //    :hsl(199.99 14.1% 4.14%)

  "color-taupe-50": string; //    :hsl(30 23.99% 98.08%)
  "color-taupe-100": string; //   :hsl(0.01 7.21% 94.93%)
  "color-taupe-200": string; //   :hsl(12 10.8% 90.06%)
  "color-taupe-300": string; //   :hsl(15.02 9.05% 83.13%)
  "color-taupe-400": string; //   :hsl(16.02 8.12% 64.12%)
  "color-taupe-500": string; //   :hsl(17.15 9.19% 44.51%)
  "color-taupe-600": string; //   :hsl(14.99 9.44% 32.52%)
  "color-taupe-700": string; //   :hsl(12.85 10.73% 25.12%)
  "color-taupe-800": string; //   :hsl(13.34 11.39% 15.14%)
  "color-taupe-900": string; //   :hsl(17.16 13.88% 9.98%)
  "color-taupe-950": string; //   :hsl(20.06 13.84% 4.12%)
};
```

#### `SpacingTokens: Tokens<SpacingSystem>`

Spacing scales.

**System**

```ts
type SpacingSystem = {
  spacing: string; //       0.25rem
  "spacing-0": string; //   0rem
  "spacing-0_5": string; // 0.125rem
  "spacing-1": string; //   0.25rem
  "spacing-1_5": string; // 0.375rem
  "spacing-2": string; //   0.5rem
  "spacing-2_5": string; // 0.625rem
  "spacing-3": string; //   0.75rem
  "spacing-3_5": string; // 0.875rem
  "spacing-4": string; //   1rem
  "spacing-4_5": string; // 1.125rem
  "spacing-5": string; //   1.25rem
  "spacing-5_5": string; // 1.375rem
  "spacing-6": string; //   1.5rem
  "spacing-7": string; //   1.75rem
  "spacing-8": string; //   2rem
  "spacing-9": string; //   2.25rem
  "spacing-10": string; //  2.5rem
  "spacing-11": string; //  2.75rem
  "spacing-12": string; //  3rem
  "spacing-14": string; //  3.5rem
  "spacing-16": string; //  4rem
  "spacing-20": string; //  5rem
  "spacing-24": string; //  6rem
  "spacing-28": string; //  7rem
  "spacing-32": string; //  8rem
  "spacing-36": string; //  9rem
  "spacing-40": string; //  10rem
  "spacing-44": string; //  11rem
  "spacing-48": string; //  12rem
  "spacing-52": string; //  13rem
  "spacing-56": string; //  14rem
  "spacing-60": string; //  15rem
  "spacing-64": string; //  16rem
  "spacing-72": string; //  18rem
  "spacing-80": string; //  20rem
  "spacing-96": string; //  24rem
};
```

#### `TypographyTokens: Tokens<TypographySystem>`

Typography fonts and scales.

**System**

```ts
type TypographySystem = {
  "font-sans": string; //                             ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
  "font-sans--font-feature-settings": string; //      normal
  "font-sans--font-variation-settings": string; //    normal
  "font-serif": string; //                            ui-serif, Georgia, Cambria, "Times New Roman", Times, serif
  "font-serif--font-feature-settings": string; //     normal
  "font-serif--font-variation-settings": string; //   normal
  "font-mono": string; //                             ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace
  "font-mono--font-feature-settings": string; //      normal
  "font-mono--font-variation-settings": string; //    normal
  "font-heading": string; //                          ui-serif, Georgia, Cambria, "Times New Roman", Times, serif
  "font-heading--font-feature-settings": string; //   normal
  "font-heading--font-variation-settings": string; // normal
  "font-body": string; //                             ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
  "font-body--font-feature-settings": string; //      normal
  "font-body--font-variation-settings": string; //    normal

  "font-weight-thin": string; //                      100
  "font-weight-extralight": string; //                200
  "font-weight-light": string; //                     300
  "font-weight-normal": string; //                    400
  "font-weight-medium": string; //                    500
  "font-weight-semibold": string; //                  600
  "font-weight-bold": string; //                      700
  "font-weight-extrabold": string; //                 800
  "font-weight-black": string; //                     900

  text: string; //                                    1rem
  "text-xs": string; //                               0.75rem
  "text-xs--line-height": string; //                  calc(1 / 0.75)
  "text-sm": string; //                               0.875rem
  "text-sm--line-height": string; //                  calc(1.25 / 0.875)
  "text-md": string; //                               1rem
  "text-md--line-height": string; //                  calc(1.5 / 1)
  "text-lg": string; //                               1.125rem
  "text-lg--line-height": string; //                  calc(1.75 / 1.125)
  "text-xl": string; //                               1.25rem
  "text-xl--line-height": string; //                  calc(1.75 / 1.25)
  "text-2xl": string; //                              1.5rem
  "text-2xl--line-height": string; //                 calc(2 / 1.5)
  "text-3xl": string; //                              1.875rem
  "text-3xl--line-height": string; //                 calc(2.25 / 1.875)
  "text-4xl": string; //                              2.25rem
  "text-4xl--line-height": string; //                 calc(2.5 / 2.25)
  "text-5xl": string; //                              3rem
  "text-5xl--line-height": string; //                 1
  "text-6xl": string; //                              3.75rem
  "text-6xl--line-height": string; //                 1
  "text-7xl": string; //                              4.5rem
  "text-7xl--line-height": string; //                 1
  "text-8xl": string; //                              6rem
  "text-8xl--line-height": string; //                 1
  "text-9xl": string; //                              8rem
  "text-9xl--line-height": string; //                 1

  "leading-none": string; //                          1
  "leading-tight": string; //                         1.25
  "leading-snug": string; //                          1.375
  "leading-normal": string; //                        1.5
  "leading-relaxed": string; //                       1.625
  "leading-loose": string; //                         2

  "tracking-tighter": string; //                      -0.05em
  "tracking-tight": string; //                        -0.025em
  "tracking-normal": string; //                       0em
  "tracking-wide": string; //                         0.025em
  "tracking-wider": string; //                        0.05em
  "tracking-widest": string; //                       0.1em
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
