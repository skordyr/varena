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

### `createStyles`

```ts
// button.styles.ts
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
//   classes?:
//     | { root?: string; icon?: string }
//     | ((variants: { size?: "sm" | "lg"; tone?: "neutral" | "danger" }) => { root?: string; icon?: string } | undefined);
//   size?: "sm" | "lg";
//   tone?: "neutral" | "danger";
// }
```

```ts
ButtonStyles.definition;
// => {
//   classes: { root: "btn", icon: "btn__icon" },
//   variants: {
//     size: {
//       sm: { root: "btn--sm", icon: "btn__icon--sm" },
//       lg: { root: "btn--lg", icon: "btn__icon--lg" },
//     },
//     tone: {
//       neutral: { root: "btn--neutral" },
//       danger: { root: "btn--danger" },
//     },
//   },
//   compoundVariants: [{ variants: { size: "lg", tone: "danger" }, classes: { root: "btn--lg-danger" } }],
//   defaultVariants: { size: "sm", tone: "neutral" },
// }
```

```ts
ButtonStyles.classes;
// => {
//   root: "btn btn--sm btn--neutral",
//   icon: "btn__icon btn__icon--sm",
// }
```

```ts
const classes = ButtonStyles();

classes.root;
// => "btn btn--sm btn--neutral"

classes.icon;
// => "btn__icon btn__icon--sm"
```

```ts
const classes = ButtonStyles({
  variants: { size: "lg", tone: "danger" },
});

classes.root;
// => "btn btn--lg btn--danger btn--lg-danger"

classes.icon;
// => "btn__icon btn__icon--lg"
```

```ts
const classes = ButtonStyles({
  variants: { size: "lg" },
  classes: { icon: "custom-icon" },
});

classes.root;
// => "btn btn--lg btn--neutral"

classes.icon;
// => "btn__icon btn__icon--lg custom-icon"
```

```ts
const classes = ButtonStyles({
  variants: { tone: "danger" },
  classes: (variants) => ({
    root: variants.tone === "danger" ? "btn--ring" : undefined,
  }),
});

classes.root;
// => "btn btn--sm btn--danger btn--ring"

classes.icon;
// => "btn__icon btn__icon--sm"
```

```ts
const classes = ButtonStyles(undefined, "extra-root-class");

classes.root;
// => "btn btn--sm btn--neutral extra-root-class"

classes.icon;
// => "btn__icon btn__icon--sm"
```

### `createTokens`

```ts
// theme.tokens.ts
import type { InferTokensConfig } from "varena";
import { createTokens } from "varena";

export const ThemeTokens = createTokens(
  {
    "color.primary": "#0ea5e9",
    "radius.md": "8px",
  },
  { prefix: "app" },
);

export type ThemeTokensConfig = InferTokensConfig<typeof ThemeTokens>;
// => {
//   "color.primary"?: string;
//   "radius.md"?: string;
// }
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

DarkThemeTokens.definition;
// => { "color.primary": "#0284c7", "radius.md": "8px" }

DarkThemeTokens({});
// => {}

DarkThemeTokens({ "color.primary": "#075985" });
// => { "--app-color-primary": "#075985" }

DarkThemeTokens.style;
// => { "--app-color-primary": "#0284c7", "--app-radius-md": "8px" }

DarkThemeTokens.property("color.primary");
// => "--app-color-primary"

DarkThemeTokens.variable("color.primary");
// => "var(--app-color-primary)"

DarkThemeTokens.variable("radius.md", "6px");
// => "var(--app-radius-md, 6px)"
```

### `create`

```bash
pnpm add tailwind-merge
```

```ts
// varena.ts
import { create } from "varena";
import { twMerge } from "tailwind-merge";

export const { createStyles, createTokens } = create({
  mergeClasses: twMerge,
});
```

```ts
// button.styles.ts
import type { InferComponentStylesConfig } from "varena";
import { createStyles } from "./varena";

export const ButtonStyles = createStyles({
  classes: {
    root: "rounded-md bg-white p-4",
  },
});

export type ButtonStylesConfig = InferComponentStylesConfig<typeof ButtonStyles>;
// => { classes?: { root?: string } | ((variants: {}) => { root?: string } | undefined) }
```

```ts
// button.tsx
import { ButtonStyles } from "./button.styles";

const classes = ButtonStyles(undefined, "rounded-xl p-2");

classes.root;
// => "bg-white rounded-xl p-2"
```

### `cx`

```ts
import { cx } from "varena";

const className = cx("btn", undefined, "btn--primary", "rounded-md");
// => "btn btn--primary rounded-md"
```

### `sx`

```ts
import { sx } from "varena";

const style = sx({ padding: "8px", borderRadius: "8px" }, undefined, {
  padding: "12px",
  color: "white",
});
// => { padding: "12px", borderRadius: "8px", color: "white" }
```

## API Reference

### `create(options?)`

Create a preconfigured varena instance so `createStyles` and `createTokens` share defaults.

**Parameters**

- `options?: CreateOptions` - Optional global defaults applied to both factories.
- `options.mergeClasses?: (...classes: string[]) => string` - Default class merge strategy injected into `createStyles`.
- `options.createVariableName?: (key: string, prefix?: string) => string` - Default token-key-to-variable-name mapper injected into `createTokens`.

**Returns**

- `{ createStyles, createTokens }` - Preconfigured factories with the provided defaults applied.

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

- `Styles(config?, overrides?) => classes` - Resolves final classes by combining defaults, variants, and overrides.
- `Styles.definition` - Original style definition passed to `createStyles`.
- `Styles.classes` - Cached classes resolved from base classes + `defaultVariants`.

**Call-time Parameters**

- `config.variants?: Partial<Variants<classes, variants>>` - Per-call variant overrides.
- `config.classes?: Partial<classes> | ((variants) => Partial<classes> | undefined)` - Per-call slot class patches, either object or function form.
- `overrides?: Partial<classes> | string` (`string` is treated as `root`) - Final override layer applied after variants/config classes.

### `createTokens(tokens, options?)`

Create a typed token factory for generating CSS custom properties and `var(...)` helpers.

**Parameters**

- `tokens: TokensValue` - Base token definition map.
- `options?: CreateTokensOptions` - Optional token factory behavior overrides.
- `options.prefix?: string` - Prefix prepended to generated CSS custom property names.
- `options.createVariableName?: (key: string, prefix?: string) => string` - Custom formatter for CSS variable names.

**Returns**

- `Tokens(config) => CSSVariablesObject` - Generates a CSS variable style object from token overrides.
- `Tokens.definition` - Original token definition passed to `createTokens`.
- `Tokens.style` - Cached style object generated from full default token values.
- `Tokens.value(key, fallback?)` - Reads a token value, using `fallback` when the key is missing.
- `Tokens.property(key)` - Returns the CSS custom property name for a token key.
- `Tokens.variable(key, fallback?)` - Returns `var(...)` reference for a token key, with optional fallback.
- `Tokens.extend(config)` - Returns a new `Tokens` instance with merged default values.

**Call-time Parameters**

- `config: Partial<typeof tokens>` - Partial token overrides to generate a style object for a specific context.

### `cx(...classes)`

Merge class names and ignore falsy `undefined` entries.

**Parameters**

- `classes: (string | undefined)[]` - Class names to merge in order.

**Returns**

- `string | undefined` - Merged class string with `undefined` entries skipped.

### `sx(...styles)`

Merge style objects and ignore `undefined` entries.

**Parameters**

- `styles: (object | undefined)[]` - Style objects to shallow-merge in order.

**Returns**

- `object | undefined` - Merged style object with `undefined` entries skipped.

### Infer Utilities

Type helpers for extracting config types from `createStyles` and `createTokens` outputs.

#### `InferStylesConfig<TStyles>`

Infers the full `createStyles` call config type.

**Input**

- `TStyles extends Styles<any, any>` - A `createStyles` return type.

**Output**

- `{ classes?: Partial<ClassesValue> | ((variants) => Partial<ClassesValue> | undefined); variants?: Partial<Variants<...>> }` - Full config shape accepted by `Styles(config)`.

#### `InferComponentStylesConfig<TStyles>`

Infers a component-friendly flattened style config type.

**Input**

- `TStyles extends Styles<any, any>` - A `createStyles` return type.

**Output**

- `{ classes?: Partial<ClassesValue> | ((variants) => Partial<ClassesValue> | undefined); [variantName]?: VariantValue }` - Flattened component props style config.

#### `InferTokensConfig<TTokens>`

Infers the config shape accepted by a `Tokens(config)` call.

**Input**

- `TTokens extends Tokens<any>` - A `createTokens` return type.

**Output**

- `Partial<TokensValue>` - Config shape accepted by `Tokens(config)`.

## License

MIT
