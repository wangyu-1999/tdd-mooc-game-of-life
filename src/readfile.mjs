import fs from "fs/promises";

export const readFile = async (filePath) => {
  const file = await fs.readFile(filePath, "utf-8");
  return file;
};

export const extractX = (line) => {
  const x_match = line.match(/x\s+=\s+(\d+)/);
  if (x_match) {
    return parseInt(x_match[1]);
  }
  return null;
};

export const extractY = (line) => {
  const y_match = line.match(/y\s+=\s+(\d+)/);
  if (y_match) {
    return parseInt(y_match[1]);
  }
  return null;
};

export const extractPattern = (fileContent) => {
  const lines = fileContent.split("\n");
  return lines[lines.length - 1].trim();
};


