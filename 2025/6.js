// Part one
import { readFileSync } from "fs";

const data = readFileSync("./data.txt", "utf-8").split("\n");
// const data = readFileSync("./testData.txt", "utf-8").split("\n");
const cleanData = data.map((line) =>
  line
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((str) => (/[^a-zA-Z0-9_]/.test(str) ? str : Number(str)))
);

const math_it_up = {
  "+": function (x, y) {
    return x + y;
  },
  "-": function (x, y) {
    return x - y;
  },
  "*": function (x, y) {
    return x * y;
  },
  "/": function (x, y) {
    return x / y;
  },
};

const processData = (_data) => {
  //   console.log("_data:", _data);
  const numRows = _data.length;
  return cleanData[0].reduce((acc, currNum, i) => {
    const operator = _data[numRows - 1][i];
    let sum = currNum;

    for (let j = 1; j < numRows - 1; j++) {
      sum = math_it_up[operator](sum, _data[j][i]);
    }

    return acc + sum;
  }, 0);
};

console.log("Processed Data:", processData(cleanData));

// Part two

const processData2 = (rawData) => {
  const lines = rawData;

  // Find the maximum line length
  const maxLength = Math.max(...lines.map((line) => line.length));

  // Pad all lines to the same length
  const paddedLines = lines.map((line) => line.padEnd(maxLength, " "));

  const operatorRow = paddedLines[paddedLines.length - 1];

  // Find all operator positions and group columns into problems
  const problems = [];
  let i = maxLength - 1;

  while (i >= 0) {
    const char = operatorRow[i];

    if ("+-*/".includes(char)) {
      // Found an operator - collect all non-space columns to the right
      const operator = char;
      const startCol = i;

      // Move right to find all columns that belong to this problem
      let j = i + 1;
      while (j < maxLength && operatorRow[j] === " ") {
        j++;
      }
      // j is now at the next operator or past the end
      // So columns from i to j-1 belong to this problem
      const endCol = j - 1;

      problems.push({
        operator,
        startCol,
        endCol,
      });

      i--;
    } else {
      i--;
    }
  }

  let grandTotal = 0;

  // Process each problem
  for (const problem of problems) {
    const numbers = [];

    // Each column in the problem range forms one number
    for (let col = problem.startCol; col <= problem.endCol; col++) {
      let numStr = "";

      // Read top-to-bottom for this column (excluding operator row)
      for (let row = 0; row < paddedLines.length - 1; row++) {
        const char = paddedLines[row][col];
        if (char !== " ") {
          numStr += char;
        }
      }

      if (numStr !== "") {
        numbers.push(Number(numStr));
      }
    }

    // Calculate result
    if (numbers.length > 0) {
      let result = numbers[0];
      for (let i = 1; i < numbers.length; i++) {
        result = math_it_up[problem.operator](result, numbers[i]);
      }
      grandTotal += result;
    }
  }

  return grandTotal;
};

console.log("Processed Data Part 2:", processData2(data));
