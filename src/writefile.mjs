import fs from "fs/promises";

export const getInfoLine = (board) => {
  board.updateLength();
  board.updateHeight();
  return `x = ${board.length}, y = ${board.height}, rule = B3/S23`;
};

export const writeFile = (filePath, str) => {
  fs.writeFile(filePath, str, "utf-8");
};
