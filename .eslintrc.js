module.exports = {
  env: {
    browser: true,
  },
  extends: ["plugin:react/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      js: true,
      jsx: true,
      experimentalObjectRestSpread: true,
    },
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "prettier/prettier": "error",
  },
};
