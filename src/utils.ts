import * as fs from 'fs-extra';
import * as path from 'path';
import { fromPath } from 'pdf2pic';
import type { Options } from 'pdf2pic/dist/types/options';

import { INPUT_DIRECTORY, OUTPUT_DIRECTORY } from './constants';
import type { Dimension } from './types';

const { readdir, ensureDirSync } = fs;

export const readPDFs = async (inputDirectory: string) => {
  const filePaths = await readdir(inputDirectory);
  return filePaths.filter((fileName) => fileName !== '.DS_Store');
};

export const createDirs = (fileNamesWithExtension: string[]) => {
  const fileNames = fileNamesWithExtension.map((fileNameWithExt) => {
    const { name } = path.parse(fileNameWithExt);

    ensureDirSync(`${OUTPUT_DIRECTORY}/${name}`);

    return name;
  });

  return fileNames;
};

export const convertPdf = async (
  fileName: string,
  dimension: Dimension,
  format: string,
) => {
  const inputFilePath = `${INPUT_DIRECTORY}/${fileName}.pdf`;
  const outputFilePath = `${OUTPUT_DIRECTORY}/${fileName}`;

  // 需要根據 PDF 的解析度調整 width 和 height
  const options: Options = {
    ...dimension,
    density: 100,
    saveFilename: fileName,
    savePath: outputFilePath,
    format,
  };

  await fromPath(inputFilePath, options)
    .bulk?.(-1)
    .catch((error) => {
      console.error(error);
    });

  console.log(`Success convert file ${fileName}`);

  return fileName;
};

export const convertPdfs = async (
  fileNames: string[],
  dimension: Dimension,
  format = 'jpeg',
) => {
  const promises = fileNames.map((filename) =>
    convertPdf(filename, dimension, format),
  );

  const results = await Promise.allSettled(promises).catch((e) =>
    console.error(e),
  );

  return results;
};
