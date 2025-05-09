import { getArgsFromCli } from "./cli.mjs";
import { getOutputPath, getInfoLine, writeFile } from "./writefile.mjs";
import { readFile, extractPattern } from "./readfile.mjs";
import { Board } from "./board.mjs";

const { path, iter } = getArgsFromCli();
console.log(`read file from ${path} and the iteration is ${iter}`);
const fileContent = await readFile(path);
console.log(`read file content: ${fileContent}`);
const pattern = extractPattern(fileContent);
console.log(`extract pattern: ${pattern}`);
const board = Board.getBoardFromRLEString(pattern);
console.log(
  `board: 
${board.toString()}`,
);
for (let i = 0; i < iter; i++) {
  board.tick();
  console.log(
    `iteration: ${i + 1}
board: 
${board.toString()}`,
  );
}
const outputPath = getOutputPath();
const infoLine = getInfoLine(board);
const rleString = board.boardToRLEString();
const res = `${infoLine}\n${rleString}`;
console.log(`write file to ${outputPath}
file content:
${res}`);
writeFile(outputPath, res);
