// Number 数値
const typeNum = typeof 3;
console.log(`typeof 3: ${typeNum}`); // => typeof 3: number

// String 文字列
const typeStr = typeof "テスト";
console.log(`typeof "テスト": ${typeStr}`); // => typeof "テスト": string

// Boolean 真偽
const typeBool = typeof true;
console.log(`typeof true: ${typeBool}`); // => typeof true: boolean

// Undefined
const typeUndefined = typeof undefined;
console.log(`typeof undefined: ${typeUndefined}`); // => typeof undefined: undefined

// Symbol シンボル
const typeSymbol = typeof Symbol("test");
console.log(`typeof Symbol("test"): ${typeSymbol}`); // => typeof Symbol("test"): symbol

// Null
const typeNull = typeof null;
console.log(`typeof null: ${typeNull}`); // => typeof null: object
