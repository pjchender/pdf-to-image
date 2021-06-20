const allExtensions = ['.ts', '.tsx', '.d.ts', '.js', '.jsx', '.json'];

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,

    /**
     * 因為有使用 recommended-requiring-type-checking
     * 所以要告知 @typescript-eslint 要使用的 tsconfig 檔
     * 讓它能夠取得正確的 type information
     * */
    project: 'tsconfig.eslint.json',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    tsconfigRootDir: __dirname, // 如果是 monorepo 建議要加這行，避免找到外層的 tsconfig
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  extends: [
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
    '@typescript-eslint/no-unused-vars': 'off', // 這個規則原本 ts 就內建了
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
  settings: {
    node: {
      extensions: allExtensions,
    },
    'import/resolver': {
      'babel-module': {
        alias: {
          '@': './src',
        },
        extensions: allExtensions,
      },
    },
  },

  /**
   * 定義給測試用的環境
   */
  overrides: [
    {
      files: ['tests/**/*.ts'],
      env: {
        jest: true,
        node: true,
      },
    },
  ],
};
