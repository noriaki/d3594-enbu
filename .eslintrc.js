module.exports = {
  parser: 'babel-eslint',
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb'
  ],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
  globals: {
    BRANCH: true,
    COMMIT: true,
    ga: true,
  },
  rules: {
    indent: ['error', 2],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
    'no-debugger': 'warn',
    'no-use-before-define': 'off',
    'no-confusing-arrow': ['error', { allowParens: true }],
    'function-paren-newline': 'off',
    'react/jsx-closing-bracket-location': [ 'error', 'after-props' ],
    'react/jsx-filename-extension': ['error', {
      extensions: ['.js', '.jsx']
    }],
    'react/prop-types': 'warn',
    'react/no-did-mount-set-state': 'warn',
    'import/no-extraneous-dependencies': ['error', { dependencies: true } ],
    'jsx-a11y/label-has-for': ['error', {
      components: ['label'],
      required: { some: ['id'] },
    }]
  },
};
