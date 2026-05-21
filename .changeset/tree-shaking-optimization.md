---
"varena": patch
---

feat(design-system): :zap: optimize tree-shaking for DesignTokens

- Wrap `createTokens` call in `run()` function for better tree-shaking support
