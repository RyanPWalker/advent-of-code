// Part one
import { readFileSync } from "fs";

const data = readFileSync("./data.txt", "utf-8")
  .split("\n")
  .map((row) => row.split(""));
// const data = readFileSync("./testData.txt", "utf-8")
//   .split("\n")
//   .map((row) => row.split(""));

const isPaper = (cell) => cell === "@";

const processData = (_data) => {
  let sum = 0;

  _data.forEach((row, i) => {
    // console.log(`Row ${i + 1}:`);
    const isNotFirstRow = i > 0;
    const isNotLastRow = i < _data.length - 1;
    row.forEach((cell, j) => {
      let adjacentPaperCount = 0;

      if (isPaper(cell)) {
        const isNotFirstCol = j > 0;
        const isNotLastCol = j < row.length - 1;

        // Check adjacent cells
        if (isNotFirstCol) {
          if (isPaper(row[j - 1])) adjacentPaperCount++; // left
        }
        if (isNotLastCol) {
          if (isPaper(row[j + 1])) adjacentPaperCount++; // right
        }
        if (isNotFirstRow) {
          if (isPaper(_data[i - 1][j])) adjacentPaperCount++; // up
          if (isNotFirstCol) {
            if (isPaper(_data[i - 1][j - 1])) adjacentPaperCount++; // up-left
          }
          if (isNotLastCol) {
            if (isPaper(_data[i - 1][j + 1])) adjacentPaperCount++; // up-right
          }
        }
        if (isNotLastRow) {
          if (isPaper(_data[i + 1][j])) adjacentPaperCount++; // down
          if (isNotFirstCol) {
            if (isPaper(_data[i + 1][j - 1])) adjacentPaperCount++; // down-left
          }
          if (isNotLastCol) {
            if (isPaper(_data[i + 1][j + 1])) adjacentPaperCount++; // down-right
          }
        }

        // console.log(
        //   ` Cell (${i},${j}) has ${adjacentPaperCount} adjacent paper cells.`
        // );
        if (adjacentPaperCount < 4) {
          sum++;
        }
      }
    });
  });

  return sum;
};

// console.log("Processed Data:", processData(data));

// Part two

const processData2 = (_data, sum = 0) => {
  let didRemovePaper = false;

  _data.forEach((row, i) => {
    const isNotFirstRow = i > 0;
    const isNotLastRow = i < _data.length - 1;
    row.forEach((cell, j) => {
      let adjacentPaperCount = 0;

      if (isPaper(cell)) {
        const isNotFirstCol = j > 0;
        const isNotLastCol = j < row.length - 1;

        // Check adjacent cells
        if (isNotFirstCol) {
          if (isPaper(row[j - 1])) adjacentPaperCount++; // left
        }
        if (isNotLastCol) {
          if (isPaper(row[j + 1])) adjacentPaperCount++; // right
        }
        if (isNotFirstRow) {
          if (isPaper(_data[i - 1][j])) adjacentPaperCount++; // up
          if (isNotFirstCol) {
            if (isPaper(_data[i - 1][j - 1])) adjacentPaperCount++; // up-left
          }
          if (isNotLastCol) {
            if (isPaper(_data[i - 1][j + 1])) adjacentPaperCount++; // up-right
          }
        }
        if (isNotLastRow) {
          if (isPaper(_data[i + 1][j])) adjacentPaperCount++; // down
          if (isNotFirstCol) {
            if (isPaper(_data[i + 1][j - 1])) adjacentPaperCount++; // down-left
          }
          if (isNotLastCol) {
            if (isPaper(_data[i + 1][j + 1])) adjacentPaperCount++; // down-right
          }
        }

        if (adjacentPaperCount < 4) {
          sum++;
          didRemovePaper = true;
          _data[i][j] = "."; // Remove the paper cell
        }
      }
    });
  });

  if (didRemovePaper) {
    return processData2(_data, sum);
  }

  return sum;
};

console.log("Processed Data:", processData2(data));
