class StopWatch {
  constructor(options = {}) {
    this.options = options;
  }

  init() {
    let { color, backgroundColor } = this.options;

    color = color || "lightblue";
    backgroundColor = backgroundColor || "black";

    const display = document.getElementsByClassName("display")[0];
    display.style.color = color;
    display.style.backgroundColor = backgroundColor;

    this.logElm = document.querySelector(".log");

    let timer = null;
    const startButton = document.getElementsByClassName("startButton")[0];
    startButton.addEventListener("click", () => {
      let seconds = 0;
      if (timer === null) {
        timer = setInterval(() => {
          seconds++;
          displayElm.innerHTML = seconds;
          console.log(seconds);
        }, 1000);

        this.addMessage("開始");
      }
    });

    const stopButton = document.getElementsByClassName("stopButton")[0];
    stopButton.addEventListener("click", () => {
      if (timer !== null) {
        console.log("stop:" + timer);
        clearInterval(timer);
        timer = null;
        this.addMessage("終了");
      }
    });
  }

  addMessage = (message) => {
    const messageElm = document.createElement("div");
    const now = new Date();
    messageElm.innerHTML = now.getHours() + "時" + now.getMinutes() + "分" + now.getSeconds() + "秒　" + message;
    messageElm.classList = ["message"];
    this.logElm.appendChild(messageElm);
  };
}

const options = {
  color: "limegreen",
  backgroundColor: "#333",
};
const stopWatch = new StopWatch(options);
stopWatch.init();
