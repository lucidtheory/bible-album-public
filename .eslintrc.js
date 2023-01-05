module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-typescript',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'import',
    'react-hooks',
  ],
  rules: {
    '@typescript-eslint/no-redeclare': [
      'error',
    ],
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/no-use-before-define': [
      'off',
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/no-shadow': ['error'],
    'import/extensions': [
      'warn',
      'never',
      {
        svg: 'always',
        json: 'always',
      },
    ],
    'import/named': 'error',
    'import/no-cycle': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'react/display-name': 'off',
    'react/jsx-curly-spacing': [
      'error',
      {
        when: 'never',
        children: true,
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: [
          '.tsx',
          '.jsx',
        ],
      },
    ],
    'react/prefer-stateless-function': 'off',
    'react/prop-types': 'off',
    'react/sort-comp': [
      'error',
      {
        order: [
          'static-variables',
          'static-methods',
          'instance-variables',
          'lifecycle',
          'everything-else',
          'render',
        ],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    curly: [
      'error',
      'all',
    ],
    'max-len': [
      'error',
      160,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'self',
        ],
      },
    ],
    'no-underscore-dangle': [
      'error',
      {
        allowAfterThis: true,
        allow: ['_id'],
      },
    ],
    'no-use-before-define': 'off',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
      },
    ],
    'no-shadow': 'off',
    'no-nested-ternary': 'off',
    'object-curly-newline': 'off',
    semi: [
      'error',
      'always',
    ],
    'no-console': 'off', // We will turn this on when we have an official logger service
  },
  globals: {
    __DEV__: true,
    __TEST__: true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [
          'src',
        ],
        extensions: [
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
      },
    },
    react: {
      version: 'detect',
    },
  },
};
