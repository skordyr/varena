---
"varena": patch
---

refactor: :recycle: optimize variant resolution in `createStyles`

- Replace `.reduce()` with explicit `for...of` loops for readability
- Pre-compute compound variant conditions to avoid redundant iteration
- Extract `slotsEntries` outside `create()` to avoid repeated `Object.entries()`
- Rename `isMatched` → `isMatch`, `isNonEmptyVariantsValue` → `hasDefinedVariants`
