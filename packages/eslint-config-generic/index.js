module.exports = {
  extends: [
    "turbo",
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jest"],
  rules: {
    "@typescript-eslint/no-explicit-any": ["off"],
  },
};
