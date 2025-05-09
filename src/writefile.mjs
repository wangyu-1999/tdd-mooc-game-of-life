import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";
export const getInfoLine = (board) => {
  board.updateLength();
  board.updateHeight();
  return `x = ${board.length}, y = ${board.height}, rule = B3/S23`;
};

export const getOutputPath = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = resolve(dirname(__filename), "../");
  return join(__dirname, "output/output.rle");
};

export const writeFile = async (filePath, str) => {
  await fs.mkdir(resolve(filePath, "../"), { recursive: true });
  await fs.writeFile(filePath, str, "utf-8");
};
