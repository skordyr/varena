import { defineConfig } from "oxfmt";

export default defineConfig({
  experimentalSortImports: {
    groups: [
      "side_effect",
      "side_effect_style",
      "type-builtin",
      "builtin",
      "type-external",
      "external",
      "type-internal",
      "internal",
      "type-index",
      "index",
      ["type-parent", "type-sibling"],
      ["parent", "sibling"],
      "style",
      "unknown",
    ],
  },
  ignorePatterns: [],
});
