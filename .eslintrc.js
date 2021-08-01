const allExtensions = ['.ts', '.tsx', '.d.ts', '.js', '.jsx', '.json'];

module.exports = {
  extends: ['pjchender/typescript'],
  parserOptions: {
    ecmaVersion: 12,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    tsconfigRootDir: __dirname, // 如果是 monorepo 建議要加這行，避免找到外層的 tsconfig

    /**
     * 因為有使用 recommended-requiring-type-checking
     * 所以要告知 @typescript-eslint 要使用的 tsconfig 檔
     * 讓它能夠取得正確的 type information
     * */
    project: 'tsconfig.eslint.json',
  },

  rules: {
    'no-console': 'off',
    'import/extensions': 'off',
    'import/order': 'off',
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
