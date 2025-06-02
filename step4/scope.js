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

// 最上位（関数等で囲まれていない）でのvarはグローバルスコープに変数を宣言する
var myGlobalVar = "myGlobalVar";

// これもグローバルスコープに変数を宣言
myGlobalVar1 = "myGlobalVar1";

function myFunction1() {
  // 関数の中で初めて使ったが、varやconstがついていないのでグローバルスコープ
  myGlobalVar2 = "myGlobalVar2";
}

console.log(myGlobalVar1);

// console.log(myGlobalVar2); // まだ宣言していないのでここで呼ぶとエラー
myFunction1(); // 関数の中でグローバル変数myGlobalVar2が宣言される
console.log(myGlobalVar2); // ここでmyGlobalVar2は利用できる

function funHoisting() {
  var myHoistingVar1 = "myHoistingVar1";
  console.log(myHoistingVar1);
  if (true) {
    var myHoistingVar1 = "変更！";
    console.log(myHoistingVar1);
  }

  console.log(myHoistingVar1); // => "変更！"
}

function blockHoisting() {
  let myHoistingVar1 = "myHoistingVar1";
  console.log(myHoistingVar1);

  if (true) {
    let myHoistingVar1 = "変更！";
    console.log(myHoistingVar1);
  }

  // varの時には変更されたが、ブロック変数なので影響を受けない
  console.log(myHoistingVar1); // => "myHoistingVar1"

  //   let myHoistingVar1 = "重複"; // エラー：同じスコープ内には同名の
}
