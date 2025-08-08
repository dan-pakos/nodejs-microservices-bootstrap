import turboConfig from "eslint-config-turbo/flat";
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import js from "@eslint/js";
import tseslint from 'typescript-eslint';
import jest from "eslint-plugin-jest"


export default [
  ...turboConfig,
  eslintConfigPrettier,
  js.configs.recommended,
  jest.configs["flat/recommended"],
  ...tseslint.configs.recommended,
  {
  languageOptions: {
			parser: tsParser
  },
  rules: {
    "@typescript-eslint/no-explicit-any": ["off"],
  },
}]
