import { afterEach, beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs/promises";
import { readFile, extractX, extractY } from "../src/readfile.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("readFile tests", () => {
  const testFilePath = join(__dirname, "test.rle");
  const testContent = `#N Blinker
#O John Conway
#C A period 2 oscillator that is the smallest and most common oscillator.
#C www.conwaylife.com/wiki/index.php?title=Blinker
x = 3, y = 1, rule = B3/S23
3o!`;
  beforeEach(async () => {
    await fs.writeFile(testFilePath, testContent);
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

  afterEach(async () => {
    await fs.unlink(testFilePath);
  });
});
