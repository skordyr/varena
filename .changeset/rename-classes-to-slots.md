---
"varena": minor
---

refactor!: :recycle: rename `classes` to `slots` throughout the API

**BREAKING CHANGE:** All `classes` references renamed to `slots` to align with slot-based architecture.

Changes:

- `ClassesValue` → `SlotsValue`
- `styles.classes` → `styles.slots`
- `config.classes` → `config.slots`
- `Styles.classes` → `Styles.slots`
- `compoundVariant.classes` → `compoundVariant.slots`
