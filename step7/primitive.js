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

// Date 日時
const typeDate = typeof new Date();
console.log(`typeof new Date(): ${typeDate}`); // => typeof new Date: object

let testStr1 = "Hello";
const testStr2 = testStr1;
console.log(testStr1, testStr2); // => Hello Hello
testStr1 = testStr1.concat("World");

// 以下の二つは違う値を示している
console.log(testStr1, testStr2); // => HelloWorld Hello

const testDate1 = new Date();
const testDate2 = testDate1;

// 時刻は実行した時の時刻が表示される
console.log(testDate1, testDate2); // => ${実行時の時間}

testDate1.setFullYear(11223);

// 以下の二つは同じ値を示している
console.log(testDate1, testDate2); // => ${実行時の時間（年だけ11223年）}
