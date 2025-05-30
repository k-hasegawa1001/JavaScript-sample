console.log("ファイル読み込みのテストです");
var element = document.getElementById("innerTest");
element.innerHTML = "<strong>JavaScript</strong>で書きました";

var buttonElm = document.getElementById("testButton");
buttonElm.addEventListener("click", function () {
  // alert("ボタンが押されました"); // 削除
  var numberElm = document.getElementById("number");
  var val = numberElm.value;
  var num = parseInt(val);
  if (num % 2 == 0) {
    alert("偶数です");
  } else {
    alert("偶数ではありません");
  }
});

var fruits = ["りんご", "もも", "みかん"];
var fruitStr = "";
for (var i = 0; i < fruits.length; i++) {
  fruitStr += '<li class="fruit">' + fruits[i] + "</li>";
}

var arrayElm = document.getElementById("arrayTest");
arrayElm.innerHTML = fruitStr;

var fruitElms = document.getElementsByClassName("fruit");
for (var i = 0; i < fruitElms.length; i++) {
  var fruitElm = fruitElms[i];
  console.log(fruitElm.textContent);
}

var colorObj = {
  red: "あか",
  green: "みどり",
  blue: "あお",
};

console.log(colorObj);

console.log(colorObj["red"]);
console.log(colorObj.red);
console.log(colorObj.blue);

colorObj["red"] = "レッド";
console.log(colorObj.red);

colorObj.blue = "ブルー";
console.log(colorObj.blue);
