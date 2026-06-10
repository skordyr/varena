---
"varena": patch
---

feat(tokens): :sparkles: add `{key}` reference syntax for `createTokens`

Token values can now reference other tokens using `{key}` and `{key ?? fallback}` syntax. `{key}` is dereferenced to `var(--prefix-key)`, and `{key ?? fallback}` to `var(--prefix-key, fallback)`, equivalent to `variable('key')` and `variable('key', 'fallback')`.
