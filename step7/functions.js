// 無名関数
const testFunction = function () {
  // ...
};

testFunction();

// アロー関数は無名関数のように扱える
const testFunction2 = () => {
  // ...
};

testFunction2();

var testValue = "test";
(function () {
  // この中の処理も順番に実行される
  var testValue = "test1";
  // ...
})();
console.log(testValue); // => test

// これは上記の即時関数とほど同じ動作
// letやconstはブロックスコープなのでこれだけでOK
{
  let testValue = "test1";
  // ...
}
