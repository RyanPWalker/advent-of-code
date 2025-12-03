// Part one
import { readFileSync } from "fs";

const data = readFileSync("./data.txt", "utf-8").split("\n");
// const data = readFileSync("./testData.txt", "utf-8").split("\n");

const getLargestJoltage = (bank) => {
  const nums = bank.split("").map(Number);
  const numsCopy = [...nums].slice(0, -1);
  const largestNum = Math.max(...numsCopy);
  const indexToRemove = numsCopy.indexOf(largestNum);
  if (indexToRemove !== -1) {
    nums.splice(0, indexToRemove + 1);
  }
  const secondLargestNum = Math.max(...nums);
  const joltage = `${largestNum}${secondLargestNum}`;

  return Number(joltage);
};

const processData = (_data) => {
  //   console.log("_data:", _data);
  return _data.reduce((acc, bank) => {
    const joltage = getLargestJoltage(bank);

    return acc + joltage;
  }, 0);
};

// console.log("Processed Data:", processData(data));

// Part 2

const getLargestJoltage2 = (bank) => {
  const nums = bank.split("").map(Number);
  let nums2 = [...nums];
  let remainingNums = 11;
  let joltage = "";
  while (nums2.length > remainingNums && remainingNums > -1) {
    const nums3 = [...nums2];
    const firstHalf =
      remainingNums > 0 ? nums3.slice(0, -remainingNums) : nums3;
    const secondHalf = nums3.slice(-remainingNums);
    const largestNum = Math.max(...firstHalf);
    joltage = joltage + largestNum;
    const indexToRemove = firstHalf.indexOf(largestNum);
    if (indexToRemove !== -1) {
      firstHalf.splice(0, indexToRemove + 1);
    }
    nums2 = firstHalf.concat(secondHalf);
    remainingNums--;
  }

  return Number(joltage);
};

const processData2 = (_data) => {
  //   console.log("_data:", _data);
  return _data.reduce((acc, bank) => {
    const joltage = getLargestJoltage2(bank);

    return acc + joltage;
  }, 0);
};

console.log("Processed Data:", processData2(data));
// console.log("Processed Data:", processData2(data.slice(1, 2)));
