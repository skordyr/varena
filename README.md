# varena

A framework-agnostic, type-safe styling library for building component variants and design tokens, with first-class slots support. Inspired by [Stitches](https://stitches.dev/).

## Features

- Framework agnostic: works anywhere you can use plain strings and style objects.
- Type-safe variants: strongly typed variant names and values.
- Slot-based components: define classes for `root`, `icon`, `label`, and any custom slot.
- Compound variants: apply classes when multiple variant conditions match.
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
import { createStyles } from "@/lib/varena";

const ButtonStyles = createStyles({
  classes: {
    root: "inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors",
    icon: "mr-2 h-4 w-4",
  },
  variants: {
    disabled: {
      true: { root: "opacity-50 cursor-not-allowed" },
    },
    variant: {
      solid: { root: "bg-blue-600 text-white hover:bg-blue-700" },
      outline: { root: "border border-gray-300 hover:bg-gray-50" },
    },
    size: {
      sm: { root: "text-sm px-3 py-1.5", icon: "h-3 w-3" },
      md: { root: "px-4 py-2", icon: "h-4 w-4" },
      lg: { root: "text-lg px-6 py-3", icon: "h-5 w-5" },
    },
    icon: {
      true: { root: "px-2", icon: "mr-0" },
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
  const { style, className, children, icon, classes, disabled, variant, size } = props;

  const $classes = ButtonStyles(
    { classes, variants: { disabled, variant, size, icon: Boolean(icon) && !children } },
    className,
  );

  return (
    <button style={style} className={$classes.root} disabled={disabled}>
      {icon && <span className={$classes.icon}>{icon}</span>}
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

// Override root classes via className
<Button className="bg-green-600 hover:bg-green-700">Custom Color</Button>

// Override multiple slots via classes
<Button classes={{ root: "w-full", icon: "animate-spin" }} icon={<LoadingIcon />}>
  Loading...
</Button>
```

## API Reference

### `create(options?)`

Create a preconfigured varena instance so `createStyles` and `createTokens` share defaults.

**Parameters**

- `options?: CreateOptions` - Optional global defaults applied to both factories.
- `options.mergeClasses?: (...classes: string[]) => string` - Default class merge strategy injected into `createStyles`.
- `options.createVariableName?: (key: string, prefix?: string) => string` - Default token-key-to-variable-name mapper injected into `createTokens`.

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

### `createStyles(styles, options?)`

Create a typed classes factory for slot-based components with variants, compound variants, and defaults.

**Parameters**

- `styles.classes: ClassesValue` - Base classes for each slot key.
- `styles.variants?: VariantsValue<classes>` - Variant definitions that patch slot classes by variant value.
- `styles.compoundVariants?: CompoundVariants<classes, variants>` - Extra class patches applied when multiple variant conditions match.
- `styles.defaultVariants?: Partial<Variants<classes, variants>>` - Default variants used when call-time variants are omitted.
- `options?: CreateStylesOptions` - Optional style factory behavior overrides.
- `options.mergeClasses?: (...classes: string[]) => string` - Custom class merging function (default joins with spaces).

**Returns**

- `Styles(config?, overrides?)` - Resolves final classes by combining defaults, variants, and overrides.
- `Styles.definition` - Original style definition passed to `createStyles`.
- `Styles.classes` - Cached classes resolved from base classes + `defaultVariants`.

**Call-time Parameters**

- `config.variants?: Partial<Variants<classes, variants>>` - Per-call variant overrides.
- `config.classes?: Partial<classes> | ((variants) => Partial<classes> | undefined)` - Per-call slot class patches, either object or function form.
- `overrides?: Partial<classes> | string` (`string` is treated as `root`) - Final override layer applied after variants/config classes.

**Examples**

```ts
import type { InferComponentStylesConfig } from "varena";
import { createStyles } from "varena";

export const ButtonStyles = createStyles({
  classes: {
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
      classes: { root: "btn--lg-danger" },
    },
  ],
  defaultVariants: {
    size: "sm",
    tone: "neutral",
  },
});

export type ButtonStylesConfig = InferComponentStylesConfig<typeof ButtonStyles>;
// => {
//   classes?: { root?: string; icon?: string } | ...;
//   size?: "sm" | "lg";
//   tone?: "neutral" | "danger";
// }
```

```ts
ButtonStyles.definition;
// => { classes: {...}, variants: {...}, compoundVariants: [...], defaultVariants: {...} }

ButtonStyles.classes;
// => { root: "btn btn--sm btn--neutral", icon: "btn__icon btn__icon--sm" }

const classes = ButtonStyles();

classes.root;
// => "btn btn--sm btn--neutral"

classes.icon;
// => "btn__icon btn__icon--sm"
```

```ts
const classes = ButtonStyles({ variants: { size: "lg", tone: "danger" } });

classes.root;
// => "btn btn--lg btn--danger btn--lg-danger"

classes.icon;
// => "btn__icon btn__icon--lg"
```

```ts
const classes = ButtonStyles(
  { classes: { icon: "custom-icon" }, variants: { size: "lg" } },
  "override-root",
);

classes.root;
// => "btn btn--lg btn--neutral override-root"

classes.icon;
// => "btn__icon btn__icon--lg custom-icon"
```

```ts
const classes = ButtonStyles(
  { classes: { icon: "custom-icon" }, variants: { size: "lg" } },
  { root: "override-root" },
);

classes.root;
// => "btn btn--lg btn--neutral override-root"

classes.icon;
// => "btn__icon btn__icon--lg custom-icon"
```

```ts
const classes = ButtonStyles({
  classes: (variants) => ({
    root: variants.tone === "danger" ? "btn--ring" : undefined,
  }),
  variants: { tone: "danger" },
});

classes.root;
// => "btn btn--sm btn--danger btn--ring"
```

### `createTokens(tokens, options?)`

Create a typed token factory for generating CSS custom properties and `var(...)` helpers.

**Parameters**

- `tokens: TokensValue` - Base token definition map.
- `options?: CreateTokensOptions` - Optional token factory behavior overrides.
- `options.prefix?: string` - Prefix prepended to generated CSS custom property names.
- `options.createVariableName?: (key: string, prefix?: string) => string` - Custom formatter for CSS variable names.

**Returns**

- `Tokens(config)` - Generates a style object with only the specified CSS custom property overrides.
- `Tokens.definition` - Original token definition passed to `createTokens`.
- `Tokens.style` - Cached style object generated from full default token values.
- `Tokens.css(selector?, wrapper?)` - Returns a formatted CSS string for creating CSS files.
- `Tokens.css(config, selector?, wrapper?)` - Returns a formatted CSS string with only the specified CSS custom property overrides.
- `Tokens.value<TKey>(key)` - Reads a token value. Returns `undefined` if the key is not defined.
- `Tokens.value<TKey>(key, fallback)` - Reads a token value with a guaranteed non-null return, using `fallback` when the key is missing.
- `Tokens.value<TKey>(key, fallback?)` - Reads a token value. Returns `undefined` if the key is not defined and no fallback is provided.
- `Tokens.property(key)` - Returns the CSS custom property name for a token key.
- `Tokens.variable(key, fallback?)` - Returns `var(...)` reference for a token key, with optional fallback.
- `Tokens.extend(config)` - Returns a new `Tokens` instance with merged default values.

**Call-time Parameters**

- `config: Partial<typeof tokens>` - Partial token overrides to generate a style object for a specific context.

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

### `cx(...classes)`

Merge class names and ignore falsy `undefined` entries.

**Parameters**

- `classes: (string | undefined)[]` - Class names to merge in order.

**Returns**

- `string | undefined` - Merged class string with `undefined` entries skipped.

**Examples**

```ts
import { cx } from "varena";

cx("btn", undefined, "btn--primary", "rounded-md");
// => "btn btn--primary rounded-md"
```

### `sx(...styles)`

Merge style objects and ignore `undefined` entries.

**Parameters**

- `styles: (object | undefined)[]` - Style objects to shallow-merge in order.

**Returns**

- `object | undefined` - Merged style object with `undefined` entries skipped.

**Examples**

```ts
import { sx } from "varena";

sx({ padding: "8px", borderRadius: "8px" }, undefined, { padding: "12px", color: "white" });
// => { padding: "12px", borderRadius: "8px", color: "white" }
```

### `isStyles(target)`

Type guard to check if a value is a `Styles` instance.

**Parameters**

- `target: unknown` - The value to check.

**Returns**

- `target is Styles<any, any>` - `true` if the value is a `Styles` instance, narrowing the type in TypeScript.

**Examples**

```ts
import { isStyles, createStyles } from "varena";

const ButtonStyles = createStyles({ classes: { root: "btn" } });

isStyles(ButtonStyles);
// => true

isStyles({});
// => false

isStyles(null);
// => false
```

### `isTokens(target)`

Type guard to check if a value is a `Tokens` instance.

**Parameters**

- `target: unknown` - The value to check.

**Returns**

- `target is Tokens<any>` - `true` if the value is a `Tokens` instance, narrowing the type in TypeScript.

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

### `InferStylesConfig<TStyles>`

Infers the full `createStyles` call config type.

**Input**

- `TStyles extends Styles<any, any>` - A `createStyles` return type.

**Output**

- `{ classes?: Partial<ClassesValue> | ((variants) => Partial<ClassesValue> | undefined); variants?: Partial<Variants<...>> }` - Full config shape accepted by `Styles(config)`.

**Examples**

```ts
import type { InferStylesConfig } from "varena";

export type ButtonStylesConfig = InferStylesConfig<typeof ButtonStyles>;
// => {
//   classes?: { root?: string; icon?: string } | ...;
//   variants?: { size?: "sm" | "lg"; tone?: "neutral" | "danger" };
// }
```

### `ExtractStylesConfig<TStyles, TRules>`

Extracts matching slot keys from the `createStyles` config type.

**Input**

- `TStyles extends Styles<any, any>` - A `createStyles` return type.
- `TRules extends string` - A string literal type pattern to match slot keys.

**Output**

- `StylesConfig` with only the matching slot keys in `classes`.

**Examples**

```ts
import type { ExtractStylesConfig } from "varena";

export type IconOnlyButtonStylesConfig = ExtractStylesConfig<typeof ButtonStyles, "icon">;
// => {
//   classes?: { icon?: string } | ...;
//   variants?: { size?: "sm" | "lg"; tone?: "neutral" | "danger" };
// }
```

### `ExcludeStylesConfig<TStyles, TRules>`

Excludes matching slot keys from the `createStyles` config type.

**Input**

- `TStyles extends Styles<any, any>` - A `createStyles` return type.
- `TRules extends string` - A string literal type pattern to exclude slot keys.

**Output**

- `StylesConfig` without the excluded slot keys in `classes`.

**Examples**

```ts
import type { ExcludeStylesConfig } from "varena";

export type WithoutIconButtonStylesConfig = ExcludeStylesConfig<typeof ButtonStyles, "icon">;
// => {
//   classes?: { root?: string } | ...;
//   variants?: { size?: "sm" | "lg"; tone?: "neutral" | "danger" };
// }
```

### `InferComponentStylesConfig<TStyles>`

Infers a component-friendly flattened style config type.

**Input**

- `TStyles extends Styles<any, any>` - A `createStyles` return type.

**Output**

- `{ classes?: Partial<ClassesValue> | ((variants) => Partial<ClassesValue> | undefined); [variantName]?: VariantValue }` - Flattened component props style config.

**Examples**

```ts
import type { InferComponentStylesConfig } from "varena";

export type ButtonStylesConfig = InferComponentStylesConfig<typeof ButtonStyles>;
// => {
//   classes?: { root?: string; icon?: string } | ...;
//   size?: "sm" | "lg";
//   tone?: "neutral" | "danger";
// }
```

### `ExtractComponentStylesConfig<TStyles, TRules>`

Extracts a component-friendly config type with only matching slots and flattened variants.

**Input**

- `TStyles extends Styles<any, any>` - A `createStyles` return type.
- `TRules extends string` - A string literal type pattern to match slot keys.

**Output**

- Flattened config type with only the matching slot keys in `classes`.

**Examples**

```ts
import type { ExtractComponentStylesConfig } from "varena";

export type IconOnlyButtonStylesConfig = ExtractComponentStylesConfig<typeof ButtonStyles, "icon">;
// => {
//   classes?: { icon?: string } | ...;
//   size?: "sm" | "lg";
//   tone?: "neutral" | "danger";
// }
```

### `ExcludeComponentStylesConfig<TStyles, TRules>`

Excludes a component-friendly config type with excluded slots and flattened variants.

**Input**

- `TStyles extends Styles<any, any>` - A `createStyles` return type.
- `TRules extends string` - A string literal type pattern to exclude slot keys.

**Output**

- Flattened config type without the excluded slot keys in `classes`.

**Examples**

```ts
import type { ExcludeComponentStylesConfig } from "varena";

export type WithoutIconButtonStylesConfig = ExcludeComponentStylesConfig<
  typeof ButtonStyles,
  "icon"
>;
// => {
//   classes?: { root?: string } | ...;
//   size?: "sm" | "lg";
//   tone?: "neutral" | "danger";
// }
```

### `InferTokensConfig<TTokens>`

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

## License

MIT
