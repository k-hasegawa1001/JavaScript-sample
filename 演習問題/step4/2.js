function funcHoisting() {
  var str = "こんにちは";
  if (true) {
    var str = "こんばんは";
  }
  console.log(str); //ここのログは何と出力されますか？
}

funcHoisting();
