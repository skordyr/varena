---
"varena": patch
---

perf(utils): :zap: optimize `cx` and `sx` runtime performance

- Replace rest parameters with `arguments` to avoid array allocation
- Replace `for...of` with index-based `for` loops
- Replace template literals with `+` concatenation in `cx`
