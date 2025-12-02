import { readFileSync } from "fs";

const data = readFileSync("./data.txt", "utf-8").split(",");
// const data = readFileSync('./testData.txt', 'utf-8').split(',');

const getRangeNumbers = (range) => range.split("-").map(Number);

const checkStringComposition = (mainString, allowedSubstring) => {
  const escapedSubstring = allowedSubstring.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );

  const regex = new RegExp(`^(${escapedSubstring})+$`);

  return regex.test(mainString);
};

const checkForMatch = (id) => {
  const str = String(id);
  const length = str.length;
  const mid = Math.floor(length / 2);
  const firstHalf = str.slice(0, mid);
  //   const secondHalf = str.slice(mid);
  //   console.log('checking:', str, length, firstHalf);

  for (let i = 0; i < firstHalf.length; i++) {
    const _str = str.slice(0, i + 1);
    if (checkStringComposition(str, _str)) {
      //   console.log('match found:', str, _str);
      return true;
    }
  }

  return false;
};

const countInvalidIds = (start, end) => {
  let sum = 0;
  for (let i = start; i <= end; i++) {
    if (checkForMatch(i)) {
      sum += Number(i);
    }
  }
  return sum;
};

const processData = (_data) => {
  return _data.reduce((acc, item) => {
    const [start, end] = getRangeNumbers(item);
    const summedIds = countInvalidIds(start, end);

    return acc + summedIds;
  }, 0);
};

console.log("Processed Data:", processData(data));
// console.log('Processed Data:', processData(['259259-259260']));
