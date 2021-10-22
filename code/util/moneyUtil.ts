
let moneySuffixes = [];

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));
const alphabetLower = alphabet.map(x => x.toLowerCase());

function generateMoneySuffixes1(): string[] {
  return alphabetLower;
}

function generateMoneySuffixes2(): string[] {
  let moneySuffixes = [];
  for (let char1 in alphabetLower) {
    for (let char2 in alphabetLower) {
      moneySuffixes.push(char1 + char2)
    }
  }
  return moneySuffixes;
}

export function generateMoneySuffixes3(): string[] {
  let moneySuffixes = [];
  for (let char1 in alphabetLower) {
    for (let char2 in alphabetLower) {
      for (let char3 in alphabetLower) {
        moneySuffixes.push(char1 + char2 + char3)
      }
    }
  }
  return moneySuffixes;
}

moneySuffixes = generateMoneySuffixes1().concat(generateMoneySuffixes2()).concat(generateMoneySuffixes3());


export function moneyScientificString(value: number): string {
  let digitPlace = 0;
  while (value >= 10) {
    digitPlace++;
    value/=10;
  }
  return value + "*10^" + digitPlace;
}

export function moneyConcatenateString(value: number): string {
  let digitPlace = 0;
  while (value >= 10) {
    digitPlace++;
    value/=10;
  }
  return value + moneySuffixes[digitPlace];
}