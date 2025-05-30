console.log("ファイル読み込みのテストです");

var lstElm = document.getElementById("lst");

var obj = {
  野菜: "季節",
  キャベツ: "春",
  スイカ: "夏",
  ナス: "秋",
  ハクサイ: "冬",
};

var tmpLen = -1;

for (var key in obj) {
  if (key.length > tmpLen) {
    tmpLen = key.length;
  }
}

const maxLength = tmpLen;

console.log(obj);

var le = "";

for (var key in obj) {
  console.log(obj[key]);
  if (key.length < maxLength) {
    le += "<li name='elm'>" + key;
    for (var i = 0; i < maxLength - key.length; i++) {
      le += "　";
    }
    le += "：" + obj[key] + "</li>";
  } else {
    le += "<li name='elm'>" + key + "：" + obj[key] + "</li>";
  }
}

lstElm.innerHTML = le;
