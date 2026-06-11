---
"varena": patch
---

refactor(design-system): :recycle: split `PaletteSystem` into individual color systems

`PaletteSystem` has been split into 27 individual color systems, each with its own type and tokens pair (e.g., `RedSystem` + `RedTokens`, `BlueSystem` + `BlueTokens`). `PaletteSystem` and `PaletteTokens` are removed. `DesignSystem` is reordered by usage frequency, with color palette systems in definition order at the end.
