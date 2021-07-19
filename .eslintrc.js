module.exports = {
  root: true,

  env: {
    node: true,
    browser: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-undef': 'off',
    'vue/no-unused-vars': 'off',
    'vue/require-v-for-key': 'off',
    'no-unused-vars': 'off',
    'vue/no-unused-components': 'off',
    'padding-line-between-statements': ['error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'function'
      }, // 函数前填充空行
      {
        blankLine: 'always',
        prev: '*',
        next: 'export'
      }, // export前填充空行
      {
        blankLine: 'always',
        prev: '*',
        next: 'block'
      }, // {} 前换行
      {
        blankLine: 'always',
        prev: '*',
        next: 'block-like'
      }, // {} 前换行
      {
        blankLine: 'always',
        prev: '*',
        next: 'expression'
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'multiline-block-like'
      }, // 多类{}前填充空行
      {
        blankLine: 'always',
        prev: 'multiline-let',
        next: '*'
      }, // 多个let后空行
      {
        blankLine: 'always',
        prev: 'multiline-const',
        next: '*'
      }, // 多个cont后空行
      {
        blankLine: 'always',
        prev: 'const',
        next: '*'
      } // 多个cont后空行
    ]
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ]
}
