interface Dictionary {
  [index: string]: any;
}

const unordered: Dictionary = {
  target: 'es5',
  allowJs: true,
  lib: ['dom', 'dom.iterable', 'esnext'],
  skipLibCheck: true,
  esModuleInterop: true,
  allowSyntheticDefaultImports: true,
  strict: true,
  sourceMap: true,
  importHelpers: true,
  experimentalDecorators: true,
  forceConsistentCasingInFileNames: true, // 確保檔案的大小寫一致，避免某些作業系統對大小寫不敏感
  noFallthroughCasesInSwitch: true, // 確保 switch case 都會有 break 或 return
  noUnusedLocals: false,
  noUnusedParameters: true,
  module: 'esnext',
  moduleResolution: 'node',
  resolveJsonModule: true,
  isolatedModules: true,
  noEmit: true, // 不要產生編譯後的結果（讓其他編譯器 babel 去作用）僅讓 editor 可以做檢查
  jsx: 'react-jsx',
  baseUrl: './src', // 匯入模組時，路徑可以使用從 baseUrl 開始，而不需要 ./../ 這種寫法
};

const ordered = Object.keys(unordered)
  .sort()
  .reduce((obj: Dictionary, key) => {
    obj[key] = unordered[key];
    return obj;
  }, {});

const result = JSON.stringify(ordered);
console.log(result);
