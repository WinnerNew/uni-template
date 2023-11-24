module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["plugin:vue/essential", "standard", "plugin:prettier/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    getCurrentPages: "readonly",
    getApp: "readonly",
    uni: "readonly",
    wx: "readonly",
    my: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    "func-call-spacing": 1,
    "no-multiple-empty-lines": 1,
    // 'no-debugger': process.env === 'development' ? 'off' : 'on'
  },
};
