function concatWorld(str) {
  str = str.concat("World"); // str1が"HelloWorld"になるわけではない
}

const str1 = "Hello";
concatWorld(str1);
console.log(str1); // => "Hello" // 変更はされない

function concatWorld(custom) {
  custom.message = custom.message.concat("World");
}

const custom1 = { message: "Hello" };
concatWorld(custom1);
console.log(custom1); // => {message: "HelloWorld"}
