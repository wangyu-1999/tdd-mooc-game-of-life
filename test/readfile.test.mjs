import { afterEach, beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs/promises";
import { readFile, extractX, extractY, extractPattern } from "../src/readfile.mjs";
import { getArgsFromCli } from "../src/cli.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const testFilePath = join(__dirname, "test.rle");
const testContent = `#N Blinker
#O John Conway
#C A period 2 oscillator that is the smallest and most common oscillator.
#C www.conwaylife.com/wiki/index.php?title=Blinker
x = 3, y = 1, rule = B3/S23
3o!`;

const testContent2_RLE_line1 = "24bo11b$22bobo11b$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o14b$2o8b";
const testContent2_RLE_line2 = "o3bob2o4bobo11b$10bo5bo7bo11b$11bo3bo20b$12b2o!";
const testContent2 = `#N Gosper glider gun
#O Bill Gosper
#C A true period 30 glider gun.
#C The first known gun and the first known finite pattern with unbounded growth.
#C www.conwaylife.com/wiki/index.php?title=Gosper_glider_gun
x = 36, y = 9, rule = B3/S23
${testContent2_RLE_line1}
${testContent2_RLE_line2}`;

describe("readFile tests", () => {
  beforeEach(async () => {
    await fs.writeFile(testFilePath, testContent);
  });

  afterEach(async () => {
    await fs.unlink(testFilePath);
  });

  test("should read file content", async () => {
    const result = await readFile(testFilePath);
    expect(result).to.equal(testContent);
  });

  test("extractX should extract x value from line", () => {
    const line = "x = 3, y = 1, rule = B3/S23";
    const xValue = extractX(line);
    expect(xValue).to.equal(3);
  });

  test("extractX should return null if x value is not present", () => {
    const line = "y = 1, rule = B3/S23";
    const xValue = extractX(line);
    expect(xValue).to.be.null;
  });

  test("extractY should extract y value from line", () => {
    const line = "x = 3, y = 1, rule = B3/S23";
    const yValue = extractY(line);
    expect(yValue).to.equal(1);
  });

  test("extractY should return null if y value is not present", () => {
    const line = "x = 3, rule = B3/S23";
    const yValue = extractY(line);
    expect(yValue).to.be.null;
  });

  test("extractX should extract x from file", async () => {
    let x;
    const result = await readFile(testFilePath);
    const lists = result.split("\n");
    lists.forEach((line) => {
      const res = extractX(line);
      if (res) {
        x = res;
        expect(x).to.equal(3);
        return;
      }
    });
  });

  test("extractY should extract y from file", async () => {
    let y;
    const result = await readFile(testFilePath);
    const lists = result.split("\n");
    lists.forEach((line) => {
      const res = extractY(line);
      if (res) {
        y = res;
        expect(y).to.equal(1);
        return;
      }
    });
  });

  test("extractPattern should extract pattern from file", async () => {
    const result = await readFile(testFilePath);
    const pattern = extractPattern(result);
    expect(pattern).to.equal("3o!");
  });
});

describe("readFile CLI tests", () => {
  const originalArgv = [...process.argv];
  beforeEach(async () => {
    process.argv = originalArgv;
    await fs.writeFile(testFilePath, testContent);
  });

  afterEach(async () => {
    process.argv = originalArgv;
    await fs.unlink(testFilePath);
  });
  test("readFile should work with CLI arguments", async () => {
    process.argv = ["node", "cli.mjs", testFilePath, "5"];
    const { path, iter } = getArgsFromCli();
    expect(path).to.equal(testFilePath);
    expect(iter).to.equal(5);
    const result = await readFile(testFilePath);
    const pattern = extractPattern(result);
    expect(pattern).to.equal("3o!");
  });
});

describe("RLE multi-line content tests", () => {
  test("extractPattern should extract pattern from file", async () => {
    await fs.writeFile(testFilePath, testContent2);
    const result = await readFile(testFilePath);
    const pattern = extractPattern(result);
    expect(pattern).to.equal(`${testContent2_RLE_line1}${testContent2_RLE_line2}`);
    await fs.unlink(testFilePath);
  });
});
