# varena

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
