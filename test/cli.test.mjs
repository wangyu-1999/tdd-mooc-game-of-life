import { afterEach, beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { getArgsFromCli } from "../src/cli.mjs";

describe("CLI tests", () => {
  const originalArgv = [...process.argv];
  beforeEach(() => {
    process.argv = originalArgv;
  });

  afterEach(() => {
    process.argv = originalArgv;
  });

  test("getArgsFromCli should return an object with the correct properties", () => {
    process.argv = ["node", "cli.mjs", "source/blinker.rle", "5"];
    const { path, iter } = getArgsFromCli();
    expect(path).to.equal("source/blinker.rle");
    expect(iter).to.equal(5);
  });

  test("getArgsFromCli should throw an error if the number of arguments is incorrect", () => {
    process.argv = ["node", "cli.mjs", "source/blinker.rle"];
    expect(() => getArgsFromCli()).to.throw("the number of arguments is not correct");
  });

  test("getArgsFromCli should throw an error if the file type is not correct", () => {
    process.argv = ["node", "cli.mjs", "source/blinker.txt", "5"];
    expect(() => getArgsFromCli()).to.throw("the file type is not correct");
  });

  test("getArgsFromCli should throw an error if the iter parameter is not correct", () => {
    process.argv = ["node", "cli.mjs", "source/blinker.rle", "-5"];
    expect(() => getArgsFromCli()).to.throw("the iter parameter is not correct");
  });
});
