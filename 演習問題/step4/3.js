function blockHoisting() {
  let str = "こんにちは";
  if (true) {
    let str = "こんばんは";
  }
  console.log(str); //ここのログは何と出力されますか？
}

blockHoisting();
