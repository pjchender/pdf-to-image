module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    tsconfigRootDir: __dirname, // 讓 @typescript-eslint 能夠知道專案根目錄的絕對路徑
    project: './tsconfig.json', // 讓 @typescript-eslint 透過相對路徑找到 tsconfig.json
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  extends: [
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': 'off',
    'no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
        typedefs: false,
        ignoreTypeReferences: true,
      },
    ],
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/*.stories.ts',
          '**/*.stories.tsx',
        ],
      },
    ],
    'import/prefer-default-export': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/order': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  ignorePatterns: ['.eslintrc.js'],
};
