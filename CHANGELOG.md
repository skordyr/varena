# varena

## 0.4.4

### Patch Changes

- 134c5a0: refactor(tokens): :recycle: remove implicit :root default from css()

  css() no longer defaults to :root — pass :root explicitly when a selector is needed.

## 0.4.3

### Patch Changes

- ee4ed7f: refactor(design-system): :art: standardize color tokens on HSL format
  - Migrated PaletteTokens values from space-separated RGB to HSL format
  - Migrated ColorTokens values from space-separated RGB to HSL format
  - Changed cursor-interactive value from "default" to "pointer"

## 0.4.2

### Patch Changes

- e4f8f31: feat(design-system): :zap: optimize tree-shaking for DesignTokens
  - Wrap `createTokens` call in `run()` function for better tree-shaking support

## 0.4.1

### Patch Changes

- 555362a: feat(design-system): :art: add default tokens to BorderTokens and TypographyTokens
  - Add `radius` token (default: "0.5rem") to `BorderSystem` and `BorderTokens`
  - Add `text` token (default: "1rem") to `TypographySystem` and `TypographyTokens`

## 0.4.0

### Minor Changes

- 38bad1f: Add built-in design system tokens
  - Add `varena/design-system` entry point with animation, border, color, effect, filter, interactivity, layout, palette, spacing, and typography tokens

## 0.3.2

### Patch Changes

- 724638b: docs: :memo: simplify API documentation style

## 0.3.1

### Patch Changes

- c9ca716: refactor: :recycle: optimize variant resolution in `createStyles`
  - Replace `.reduce()` with explicit `for...of` loops for readability
  - Pre-compute compound variant conditions to avoid redundant iteration
  - Extract `slotsEntries` outside `create()` to avoid repeated `Object.entries()`
  - Rename `isMatched` → `isMatch`, `isNonEmptyVariantsValue` → `hasDefinedVariants`

- bc4e41f: refactor: :recycle: add `Slots` utility type to normalize slot value types to `string`

## 0.3.0

### Minor Changes

- 2988818: refactor!: :recycle: rename `classes` to `slots` throughout the API

  **BREAKING CHANGE:** All `classes` references renamed to `slots` to align with slot-based architecture.

  Changes:
  - `ClassesValue` → `SlotsValue`
  - `styles.classes` → `styles.slots`
  - `config.classes` → `config.slots`
  - `Styles.classes` → `Styles.slots`
  - `compoundVariant.classes` → `compoundVariant.slots`

## 0.2.9

### Patch Changes

- 47ee512: docs: :memo: rewrite README with comprehensive Quick Start tutorial

  Add Button component tutorial with Tailwind CSS, file structure, TypeScript integration, and usage examples. Restructure API Reference with detailed examples per function.

## 0.2.8

### Patch Changes

- e04b476: docs: :memo: add type utilities usage examples

## 0.2.7

### Patch Changes

- 4564aa4: feat: :sparkles: add `Tokens.css(config, selector?, wrapper?)` overload

  Support passing a config object to generate CSS with token overrides.

## 0.2.6

### Patch Changes

- f8208b7: feat: :sparkles: add Tokens.css() method for generating CSS strings from design tokens

## 0.2.5

### Patch Changes

- d2f4a5c: docs: add documentation for ExtractStylesConfig, ExcludeStylesConfig, ExtractComponentStylesConfig, and ExcludeComponentStylesConfig

## 0.2.4

### Patch Changes

- 69ee1dc: feat: add `ExtractStylesConfig`, `ExcludeStylesConfig`, `ExtractComponentStylesConfig`, and `ExcludeComponentStylesConfig` for pattern-based class filtering

  Support pattern-based class filtering via `Extract`/`Exclude` semantics:
  - `ExtractStylesConfig<typeof styles, "_${string}">` / `ExtractComponentStylesConfig<typeof styles, "_${string}">` - extract classes by pattern
  - `ExcludeStylesConfig<typeof styles, "_${string}">` / `ExcludeComponentStylesConfig<typeof styles, "_${string}">` - exclude classes by pattern

## 0.2.3

### Patch Changes

- f6a7924: Expose `isTokens` and `isStyles` type guards
- d4b3cea: Refactor: reorganize internal utilities into `src/shared/` directory

## 0.2.2

### Patch Changes

- 461b0b6: refine API reference and examples; standardize naming and style terminology

## 0.2.1

### Patch Changes

- 55c84a0: improve createStyles and createTokens functions for clarity and consistency

## 0.2.0

### Minor Changes

- 84d4473: introduce varena (first version)
