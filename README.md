# TypeScript Template

筆記內容請參考 [Setup TypeScript Template](https://pjchender.dev/typescript/ts-setup-typescript-template/) @ pjchender.dev

## Usage

### Run in development

```bash
# run in development
yarn dev
```

### Run in production

If you use import alias, for example, `@/utils/foobar`, then it will need the `'module-alias/register'`.

> cause `module-alias/register` is not compatible with ts-node, so you should import this module only when you want to build the package with import-alias.

We use dynamic import here for the `'module-alias/register'`, so remember set the `NODE_ENV` to the `production` which will import the package.

```bash
# build and run the dist files
# remember to comment out `import 'module-alias/register'` in the `index.ts` which is used for import alias
yarn build
NODE_ENV=production yarn start
```

## Reference

- [Professional TS](https://github.com/mike-north/professional-ts) @ Github
- [Production-Grade TypeScript](https://frontendmasters.com/courses/production-typescript/) @ Frontend Masters
