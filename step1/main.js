function stopWatch(options) {
  function addMessage(message) {
    var messageElm = document.createElement("div");
    var now = new Date();
    messageElm.innerHTML = now.getHours() + "時" + now.getMinutes() + "分" + now.getSeconds() + "秒　" + message;
    messageElm.classList = ["message"];
    logElm.appendChild(messageElm);
  }

  options = options || {};
  var color = options.color || "lightblue";
  var backgroundColor = options.backgroundColor || "black";
  var displayElm = document.getElementsByClassName("display")[0];
  displayElm.style.color = color;
  displayElm.style.backgroundColor = backgroundColor;

  var logElm = document.querySelector(".log");
  var timer = null;

  ///// startButton
  // startButtonというclassが付いているタグの要素のうち、
  // 最初のもの（スタートボタン）を取り出す
  var startButton = document.getElementsByClassName("startButton")[0];

  // 取り出したstartButtonに対してクリックイベントのリスナを仕掛ける
  startButton.addEventListener("click", function () {
    // この行はクリックしたとき呼ばれる
    // console.log("start");
    var seconds = 0;
    if (timer === null) {
      timer = setInterval(function () {
        seconds++;
        displayElm.innerHTML = seconds;
        console.log(seconds);
      }, 1000);

      // var message = "開始";
      // var messageElm = document.createElement("div");
      // messageElm.innerHTML = message;
      // logElm.appendChild(messageElm);
      addMessage("開始");
    }
    console.log("start:" + timer);
  });

  ///// stopButton
  var stopButton = document.getElementsByClassName("stopButton")[0];
  stopButton.addEventListener("click", function () {
    if (timer !== null) {
      console.log("stop:" + timer);
      clearInterval(timer);
      timer = null;
      addMessage("終了");
    }
  });
}

var options = {
  color: "limegreen",
  backgroundColor: "#333",
};

stopWatch(options);
// stopWatch();
