if (true) {
  const myBlockVar1 = "myBlockVar1-true"; // これがブロックスコープの変数
  console.log(myBlockVar1);
} else {
  const myBlockVar1 = "myBlockVar1-false"; // これがブロックスコープの変数
  console.log(myBlockVar1);
}

// ブロックは意図的に書くこともできる
{
  const myBlockVar2 = "myBlockVar2"; // これがブロックスコープの変数
  console.log(myBlockVar2);
}

// console.log(myBlockVar2); // エラー：ブロックの外なので利用できない

function funcScope() {
  var myFuncVar1 = "myFuncVar1"; // これが関数スコープの変数
  console.log(myFuncVar1);
}

funcScope();
// console.log(myFuncVar1); // エラー：関数の外なのでmyFuncVar1は利用できない
