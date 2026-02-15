import { configs, parserConfigs } from "@cobapen/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    ignores: [
      "dist/",
      "lib/",
      "node_modules/",
    ],
  },
  parserConfigs.typescript.recommended,
  configs.recommended,
);