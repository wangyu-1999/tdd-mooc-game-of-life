import { describe, test } from "vitest";
import { expect } from "chai";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs/promises";
import { readFile } from "../src/readfile.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("readFile tests", () => {
  test("should read file content", async () => {
    const testFilePath = join(__dirname, "test.rle");
    const testContent = `#N Blinker
#O John Conway
#C A period 2 oscillator that is the smallest and most common oscillator.
#C www.conwaylife.com/wiki/index.php?title=Blinker
x = 3, y = 1, rule = B3/S23
3o!`;

    try {
      await fs.writeFile(testFilePath, testContent);

      const result = await readFile(testFilePath);

      expect(result).to.equal(testContent);
    } finally {
      await fs.unlink(testFilePath);
    }
  });
});
