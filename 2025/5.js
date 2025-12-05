// Part one
import { readFileSync } from "fs";

const data = readFileSync("./data.txt", "utf-8").split("\n\n");
// const data = readFileSync("./testData.txt", "utf-8").split("\n\n");
const freshList = data[0].split("\n").map((str) => str.split("-").map(Number));
const availableList = data[1].split("\n").map(Number);

const processData = (_freshList, _availableList) => {
  //   console.log("_freshList:", _freshList);
  //   console.log("_availableList:", _availableList);
  return _availableList.reduce((acc, currItem) => {
    // Check if it is in any of the ranges
    const isInRange = _freshList.find(
      ([min, max]) => currItem >= min && currItem <= max
    );

    if (!isInRange) {
      return acc;
    }

    return acc + 1;
  }, 0);
};

// console.log("Processed Data:", processData(freshList, availableList));

const mergeOverlappingRanges = (ranges) => {
  // Sort ranges by their start values
  ranges.sort((a, b) => a[0] - b[0]);

  return ranges.reduce((acc, current, index) => {
    // console.log(index, acc, current);
    if (acc.length === 0) {
      return [current];
    } else {
      const [prev1, prev2] = acc[acc.length - 1];
      const [curr1, curr2] = current;

      if (curr1 <= prev2 + 1) {
        // merge em - take the max of the end values
        acc[acc.length - 1] = [prev1, Math.max(prev2, curr2)];
        return acc;
      }
    }

    return [...acc, current];
  }, []);
};

// Part two
const processData2 = (_freshList) => {
  const mergedRanges = mergeOverlappingRanges(_freshList);
  return mergedRanges.reduce((acc, current) => {
    const [curr1, curr2] = current;
    return acc + (curr2 - curr1 + 1);
  }, 0);
};

console.log("Processed Data:", processData2(freshList));
