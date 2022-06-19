# TypeScript Template

筆記內容請參考 [Setup TypeScript Template](https://pjchender.dev/typescript/ts-setup-typescript-template/) @ pjchender.dev

## Usage

Run in development:

```bash
# run in development
yarn dev
```

Run in production:

- remember to comment out `import 'module-alias/register'` in the `index.ts` which is used for import alias

> cause `module-alias/register` is not compatible with ts-node, so you should import this module only when you want to build the package with import-alias.

```bash
# build and run the dist files
# remember to comment out `import 'module-alias/register'` in the `index.ts` which is used for import alias
yarn build
yarn start
```

## Reference

- [Professional TS](https://github.com/mike-north/professional-ts) @ Github
- [Production-Grade TypeScript](https://frontendmasters.com/courses/production-typescript/) @ Frontend Masters
