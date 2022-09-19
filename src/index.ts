/* eslint-disable @typescript-eslint/no-unsafe-member-access,  @typescript-eslint/no-floating-promises */

import { mkdirSync } from 'fs-extra';
import * as rimraf from 'rimraf';

import { INPUT_DIRECTORY, OUTPUT_DIRECTORY } from './constants';
import { convertPdfs, createDirs, readPDFs } from './utils';

async function main() {
  /**
   * Bootstrap
   * */
  if (process.env.NODE_ENV === 'production') {
    // import the package if want to use the import alias, i.e., @/utils/foobar, in the production
    // @ts-expect-error: no types definition
    await import('module-alias/register');
  }

  /**
   * Import modules using import alias with dynamic import...
   */
  // const { INPUT_DIRECTORY } = await import('./constants');

  /**
   * Write the code below...
   */
  rimraf.sync(OUTPUT_DIRECTORY);
  mkdirSync(OUTPUT_DIRECTORY);

  const fileNamesWithExtension = await readPDFs(INPUT_DIRECTORY);
  const fileNames = createDirs(fileNamesWithExtension);

  // 需要根據 PDF 的解析度調整輸出的圖檔尺寸
  const dimension = {
    width: 1191 * 1.5,
    height: 842 * 1.5,
  };
  await convertPdfs(fileNames, dimension, 'jpg');
}

main().catch((error) => {
  console.error('[main] error', error);
});
