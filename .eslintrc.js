module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "google",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    indent: ["error", "tab"],
    quotes: ["error", "single"],
    "no-tabs": 0,
    "no-unused-vars": 1,
    "no-bitwise": 0,
    "no-plusplus": 0,
    "arrow-parens": ["error", "as-needed"],
    "comma-dangle": 0,
    "no-mixed-operators": 0,
    "import/extensions": 0,
    "class-methods-use-this": 0,
    "no-restricted-syntax": 0,
  },
  overrides: [
    {
      files: ["public/"],
    },
  ],
};
