import wordBank from "./wordbank.txt";
export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async () => {
  let wordSet;
  let todaysWord;
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\n");
      wordSet = new Set(wordArr.map((word) => word.trim()));
      const offsetFromData = new Date(2023, 0, 1);
      const msoffset = Date.now() - offsetFromData;
      const dayoffset = msoffset / 1000 / 60 / 60 / 24;
      todaysWord = wordArr[Math.floor(dayoffset)].trim();
    });
  return { wordSet, todaysWord };
};
