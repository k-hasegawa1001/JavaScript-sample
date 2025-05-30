const stopWatch = (options) => {
  const addMessage = (message) => {
    const messageElm = document.createElement("div");
    const now = new Date();
    messageElm.innerHTML = now.getHours() + "時" + now.getMinutes() + "分" + now.getSeconds() + "秒　" + message;
    messageElm.classList = ["message"];
    logElm.appendChild(messageElm);
  };

  options = options || {};
  const color = options.color || "lightblue";
  const backgroundColor = options.backgroundColor || "black";
  const displayElm = document.getElementsByClassName("display")[0];
  displayElm.style.color = color;
  displayElm.style.backgroundColor = backgroundColor;

  const logElm = document.querySelector(".log");
  let timer = null;

  ///// startButton
  // startButtonというclassが付いているタグの要素のうち、
  // 最初のもの（スタートボタン）を取り出す
  const startButton = document.getElementsByClassName("startButton")[0];

  // 取り出したstartButtonに対してクリックイベントのリスナを仕掛ける
  startButton.addEventListener("click", () => {
    // この行はクリックしたとき呼ばれる
    // console.log("start");
    let seconds = 0;
    if (timer === null) {
      timer = setInterval(() => {
        seconds++;
        displayElm.innerHTML = seconds;
        console.log(seconds);
      }, 1000);

      // const message = "開始";
      // const messageElm = document.createElement("div");
      // messageElm.innerHTML = message;
      // logElm.appendChild(messageElm);
      addMessage("開始");
    }
    console.log("start:" + timer);
  });

  ///// stopButton
  const stopButton = document.getElementsByClassName("stopButton")[0];
  stopButton.addEventListener("click", () => {
    if (timer !== null) {
      console.log("stop:" + timer);
      clearInterval(timer);
      timer = null;
      addMessage("終了");
    }
  });
};

const options = {
  color: "limegreen",
  backgroundColor: "#333",
};

stopWatch(options);
// stopWatch();
