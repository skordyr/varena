---
"varena": patch
---

refactor(design-system): :recycle: use `calc({key} * n)` for derived border, spacing, and typography tokens

BorderTokens (`radius-xs`–`radius-4xl`), SpacingTokens (`spacing-0_5`–`spacing-96`), and TypographyTokens (`text-xs`–`text-9xl`) now use `calc({key} * n)` relative references instead of hardcoded rem values. Multipliers are the scale factors from the base token (e.g., `calc({radius} * 0.25)` for `radius-xs`). `calc({key} * 1)` is simplified to `{key}`, and `calc({key} * 0)` to `0`.
