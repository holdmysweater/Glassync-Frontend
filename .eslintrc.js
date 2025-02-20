module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off', // Отключение требования к многословным именам компонентов
    'vue/html-indent': ['off', 2], // Отступ 2 пробела в HTML
    'vue/max-attributes-per-line': [
      'off',
      {
        singleline: 3, // Для строк в одну линию — 1 атрибут
        multiline: 1, // Для многострочных — 1 атрибут на строку
      },
    ],
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          normal: 'always', // Всегда самозакрывающиеся
          void: 'always',
        },
      },
    ],
  },
};
