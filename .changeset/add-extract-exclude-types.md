---
"varena": patch
---

feat: add `ExtractStylesConfig`, `ExcludeStylesConfig`, `ExtractComponentStylesConfig`, and `ExcludeComponentStylesConfig` for pattern-based class filtering

Support pattern-based class filtering via `Extract`/`Exclude` semantics:

- `ExtractStylesConfig<typeof styles, "_${string}">` / `ExtractComponentStylesConfig<typeof styles, "_${string}">` - extract classes by pattern
- `ExcludeStylesConfig<typeof styles, "_${string}">` / `ExcludeComponentStylesConfig<typeof styles, "_${string}">` - exclude classes by pattern
