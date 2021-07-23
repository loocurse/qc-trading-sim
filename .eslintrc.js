module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    //"eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint/eslint-plugin", "prettier"],
  rules: {
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["warn", "always"],
    "object-curly-spacing": ["warn", "always"],
    "react/react-in-jsx-scope": "off",
    "no-case-declarations": "off",
  },
};
