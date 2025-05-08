import fs from "fs/promises";

export const readFile = async (filePath) => {
  const file = await fs.readFile(filePath, "utf-8");
  return file;
};
