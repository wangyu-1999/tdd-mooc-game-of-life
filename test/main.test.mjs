import { describe, test, beforeEach, afterEach } from "vitest";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";
import { main } from "../src/main.mjs";
import { extractX, readFile } from "../src/readfile.mjs";
import { expect } from "chai";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(dirname(__filename), "../");

const testFilePath = join(__dirname, "testfile.rle");
const testContent_RLE_line1 = "24bo11b$22bobo11b$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o14b$2o8b";
const testContent_RLE_line2 = "o3bob2o4bobo11b$10bo5bo7bo11b$11bo3bo20b$12b2o!";
const testContent = `#N Gosper glider gun
#O Bill Gosper
#C A true period 30 glider gun.
#C The first known gun and the first known finite pattern with unbounded growth.
#C www.conwaylife.com/wiki/index.php?title=Gosper_glider_gun
x = 36, y = 9, rule = B3/S23
${testContent_RLE_line1}
${testContent_RLE_line2}`;
const iter = 50;
const resX = 36;
const resY = 17;
const resContent_RLE_line1 = "26b2o$25bo3bo$9b2o13bo5bo3b2o$9b2o13bo3bob2o2b2o$2o3bo6b2o10bo5bo$obo";
const resContent_RLE_line2 = "3bo5b3o10bo3bo$b5o6b2o12b2o$2b3o4b2o9bobo$9b2o10b2o$21bo5$28bo$29b2o$";
const resContent_RLE_line3 = "28b2o!";

describe("Main", () => {
  const originalArgv = [...process.argv];
  beforeEach(async () => {
    process.argv = originalArgv;
    await fs.writeFile(testFilePath, testContent);
  });

  afterEach(async () => {
    process.argv = originalArgv;
    await fs.unlink(testFilePath);
  });
  test("test main", async () => {
    const scriptPath = join(__dirname, "src", "main.mjs");
    process.argv = ["node", scriptPath, testFilePath, iter.toString()];
    main();
    const outputPath = join(__dirname, "output", "output.rle");
    const outputContent = (await readFile(outputPath)).split("\n");
    expect(outputContent[0]).to.equal(`x = ${resX}, y = ${resY}, rule = B3/S23`);
    expect(outputContent[1]).to.equal(`${resContent_RLE_line1}${resContent_RLE_line2}${resContent_RLE_line3}`);
    await fs.unlink(outputPath);
  });
});
