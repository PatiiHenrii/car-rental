import { fixupPluginRules } from "@eslint/compat";
import { defineConfig } from "eslint/config";
import _import from "eslint-plugin-import";

export default defineConfig([{
    plugins: {
        import: fixupPluginRules(_import),
    },

    rules: {
        "import/order": ["warn", {
            groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
            "newlines-between": "always",

            alphabetize: {
                order: "asc",
                caseInsensitive: true,
            },
        }],
    },
}]);