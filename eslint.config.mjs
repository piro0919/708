import { fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
import magicNumbers from "@piro0919/eslint-config";
import google from "eslint-config-google";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";
import standard from "eslint-config-standard";
import ext from "eslint-plugin-ext";
import filenames from "eslint-plugin-filenames";
import n from "eslint-plugin-n";
import promise from "eslint-plugin-promise";
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import sortKeysFix from "eslint-plugin-sort-keys-fix";
import typescriptSortKeys from "eslint-plugin-typescript-sort-keys";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

// valid-jsdoc と require-jsdoc は ESLint 9 で無くなった
const {
  "require-jsdoc": _requireJsdoc,
  "valid-jsdoc": _validJsdoc,
  ...googleRules
} = google.rules;

export default defineConfig([
  globalIgnores(["**/*.d.ts", "**/*.js"]),
  js.configs.recommended,
  { rules: googleRules },
  {
    // eslint-plugin-import は eslint-config-next が読み込む
    plugins: { n, promise },
    rules: standard.rules,
  },
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    plugins: {
      "typescript-sort-keys": fixupPluginRules(typescriptSortKeys),
    },
    rules: typescriptSortKeys.configs.recommended.rules,
  },
  ...nextVitals,
  prettier,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.json"],
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    plugins: {
      ext: fixupPluginRules(ext),
      filenames: fixupPluginRules(filenames),
      "sort-destructure-keys": sortDestructureKeys,
      "sort-keys-fix": fixupPluginRules(sortKeysFix),
      "unused-imports": unusedImports,
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-unused-vars": "off",
      "ext/lines-between-object-properties": ["error", "never"],
      "filenames/match-exported": ["error", ["camel", "kebab", "pascal"]],
      "filenames/match-regex": "error",
      "filenames/no-index": "off",
      "import/newline-after-import": [
        "error",
        {
          count: 1,
        },
      ],
      "import/order": [
        "error",
        {
          alphabetize: {
            caseInsensitive: true,
            order: "asc",
          },
          warnOnUnassignedImports: true,
        },
      ],
      "import/prefer-default-export": "error",
      "newline-before-return": "error",
      "no-duplicate-imports": "error",
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
        },
      ],
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          next: [
            "block",
            "block-like",
            "break",
            "class",
            "const",
            "do",
            "export",
            "function",
            "let",
            "return",
            "switch",
            "try",
            "while",
          ],
          prev: "*",
        },
        {
          blankLine: "always",
          next: "*",
          prev: [
            "block",
            "block-like",
            "break",
            "class",
            "const",
            "do",
            "export",
            "function",
            "let",
            "return",
            "switch",
            "try",
            "while",
          ],
        },
        {
          blankLine: "never",
          next: "import",
          prev: "*",
        },
        {
          blankLine: "never",
          next: ["case", "default"],
          prev: "case",
        },
        {
          blankLine: "never",
          next: "const",
          prev: "const",
        },
        {
          blankLine: "never",
          next: "let",
          prev: "let",
        },
      ],
      quotes: ["error", "double"],
      "react-hooks/exhaustive-deps": [
        "error",
        {
          enableDangerousAutofixThisMayCauseInfiniteLoops: true,
        },
      ],
      "react/jsx-boolean-value": ["error", "always"],
      "react/jsx-newline": [
        "error",
        {
          prevent: true,
        },
      ],
      "react/jsx-sort-props": "error",
      "require-jsdoc": "off",
      semi: ["error", "always"],
      "sort-destructure-keys/sort-destructure-keys": "error",
      "sort-imports": [
        "error",
        {
          ignoreDeclarationSort: true,
        },
      ],
      "sort-keys": "off",
      "sort-keys-fix/sort-keys-fix": "error",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          vars: "all",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    // typescript-eslint 8 と eslint-config-next 16 で新しく入った決まり。
    // 移す前は無かったので、いまは警告にとどめる
    rules: {
      "@typescript-eslint/no-require-imports": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  ...magicNumbers({ files: ["**/*.{ts,tsx}"] }),
]);
