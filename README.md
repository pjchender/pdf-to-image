# TypeScript Template

## Usage

```bash
npm start  # run src/index.ts

npx ts-node src/foobar.ts # run TS file directly
```

- [Professional TS](https://github.com/mike-north/professional-ts) @ Github
- [Production-Grade TypeScript](https://frontendmasters.com/courses/production-typescript/) @ Frontend Masters

## TL;DR

- TypeScript 是使用 `tsc` 來編譯 TypeScript 檔案，會吃到的設定檔是 `tsconfig.json`。當在 VSCode 中看到 ts 的錯誤時，就是由 tsc 產生。
- `tsconfig.eslint.json` 是給 @typescript-eslint 吃的 tsconfig 檔，它會繼承 `tsconfig.json`。當在 VSCode 中出現 @typescript-eslint 的錯誤就是由它產生的。
- 出現 `Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.` 的錯誤時，表示 ESLint 想要解析的檔案並沒有被列在給 @typescript-eslint 所涵括到的檔案中，解決方式可以參考 [I get errors telling me "The file must be included in at least one of the projects provided"](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md#i-get-errors-telling-me-the-file-must-be-included-in-at-least-one-of-the-projects-provided) @ typescript-eslint

## Project Implementation

> [Make TS Setup](https://github.com/mike-north/professional-ts/blob/master/notes/04-mikes-ts-setup.md) @ Github

### 添加 gitignore

直接使用 `npx gitignore node` 來添加給 NodeJS 使用的 gitignore 到專案中：

```bash
git init
npx gitignore node
```

### 安裝套件

```bash
yarn init --yes
yarn add -D typescript eslint jest
```

### 定義 package.json

```jsonc
// package.json
{
  "types": "dist/index.ts", // 讓使用此套件的人知道 Type 的定義檔在哪
  "scripts": {
    "build": "tsc",
    "dev": "yarn build --watch --preserveWatchOutput" // preserveWatchOutput 可以避免檔案變更時 console 中的內容被清空,
  }
}
```

### 設定 tsconfig

```bash
yarn tsc --int
```

修改 `tsconfig.json` 中的內容：

```json
{
  "compilerOptions": {
    "target": "ES2018", // 打包後要支援到的 ECMAScript 版本

    // 如果沒設定會套用預設值（TS 自動判斷）
    // 有「機會」導致 src 的資料夾也一起被 build 到 dist 資料夾中
    // 例如 TS 自動把 rootDir 判斷為 { "rootDir": "." }
    "rootDir": "src",

    // 預設 tsc 會直接把編譯好的 js 檔放在與 ts 檔相同的路徑，但這樣檔案會很散亂，因此全部放到 dist
    "outDir": "dist",

    "stripInternal": true, // 針對加上 @internal 的方法不會產生對應的 Type Declaration 檔（例如針對測試寫的函式）
    "types": [], // 在編譯時要一起包含的 declaration 檔

    /* 下面這兩個項目之所以關閉，是因為一但開啟，其他使用本套件的開發者也需要被迫開啟 */
    "esModuleInterop": false,
    "skipLibCheck": false
  },
  "include": ["src"]
}
```

### 設定 ESLint

```bash
yarn eslint --init
```

- How would you like to use ESLint? --> To check syntax and find problems（根據個人選擇）
- What type of modules does your project use --> None of these（因為我們用的是 TS 而非 JS Modules）
- Which framework does your project use? --> None of these
- Does your project use TypeScript? --> Yes
- Where does your code run? --> Node
- What format do you want your config file to be in? --> JS

### 設定 @typescript-eslint

由於 @typescript-eslint 希望一個 TypeScript 設定檔就能涵括到所有想要 lint 的檔案，但因為測試時使用的環境會是不同的，所以我們必須額外建立一個檔案 `tsconfig.eslint.json`

**`tsc` 編譯 TypeScript 時（和 VSCode 中看到的 ts 錯誤提示），實際上是根據 `tsconfig.json` 的設定；`tsconfig.eslint.json` 則是給 @typescript-eslint 用來解析型別用的（會繼承 `tsconfig.json` 中的設定），也就是 VSCode 中看到的 eslint 錯誤提示。**

可以參考這兩篇：

- [note-eslint](https://pjchender.dev/webdev/note-eslint/) @ pjchender.dev
- [I get errors telling me "The file must be included in at least one of the projects provided"](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md#i-get-errors-telling-me-the-file-must-be-included-in-at-least-one-of-the-projects-provided) @ typescript-eslint

另外可以參考 @typescript-eslint 提供的設定檔 [`.eslintrc.js`](https://github.com/typescript-eslint/typescript-eslint/blob/master/.eslintrc.js) 和 [`tsconfig.eslint.json`](https://github.com/typescript-eslint/typescript-eslint/blob/master/tsconfig.eslint.json)。

### 設定 testing

### 方法一：@babel/preset-typescript

**在這個範例中，TS 檔案測試的執行是使用 `@babel/preset-typescript`，而 TypeScript 本身的編譯器（tsc）並不會去執行測試的檔案**。另外，當有寫 `.babelrc` 時，Jest 預設就會去吃這支檔案。

> 除了使用 @babel/preset-typescript 來執行測試外，另一種方式是使用 [ts-jest](https://kulshekhar.github.io/ts-jest/docs/)。

安裝對應的套件：

```bash
yarn add -D jest @types/jest @babel/preset-env @babel/preset-typescript
```

- babel 是用來讓 jest 能夠解析 `.ts` 的檔案
- 建立 `.babelrc`

  ```json
  // .babelrc
  {
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            "node": "14"
          }
        }
      ],
      "@babel/preset-typescript"
    ]
  }
  ```

- 建立 `tests/tsconfig.json`（不建好像也可以）

透過 `npx tsc --showConfig` 可以檢視最終吃到的設定檔。

### 方法二：使用 ts-jest

如果想要使用 ts-jest 的話，只需：

```bash
npm install ts-jest
npx ts-jest config:init
```

這時會新建一支 `jest.config.js` 的檔案，eslint 會試著去處理它，但它並沒有被包含在 `tsconfig.eslint.json` 中設定的路徑，因此又會出現 `Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.` 此錯誤。

一樣只需要把該檔案放到 `tsconfig.eslint.json` 的 includes 中即可：

```diff
--- a/tsconfig.eslint.json
+++ b/tsconfig.eslint.json
@@ -8,6 +8,7 @@
   "include": [
     "src/**/*",
     "tests/**/*",
-    ".eslintrc.js"
+    ".eslintrc.js",
+    "jest.config.js"
   ]
 }
```

ts-jest 是使用 tsc 來編譯 TypeScript 檔案而不是使用 @babel/preset-typescript，因此會吃的設定檔是 `tsconfig.json`，在原本 `tsconfig.json` 的設定中，需要進行如下修改：

```diff
--- a/tsconfig.json
+++ b/tsconfig.json
@@ -49,7 +49,7 @@
    definitions from. */
-    "types": [],
+    "types": ["jest"],    // 讓 TS 認得 Jest
   },
 }
```

### Integrate with Jest

- [Testing with jest in TypeScript](https://itnext.io/testing-with-jest-in-typescript-cc1cd0095421)

## Reference

- [Professional TS](https://github.com/mike-north/professional-ts) @ Github
- [Production-Grade TypeScript](https://frontendmasters.com/courses/production-typescript/) @ Frontend Masters
