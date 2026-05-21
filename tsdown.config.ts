import { defineConfig } from "tsdown";

export default defineConfig({
  exports: true,
  entry: {
    index: "./src/index.ts",
    "design-system": "./src/design-system/index.ts",
  },
});
