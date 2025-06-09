class WordQuiz {
  constructor(rootElm) {
    this.rootElm = rootElm;
  }

  async init() {
    await this.fetchQuizData();
    this.displayStartView();
  }

  async fetchQuizData() {
    try {
      const response = await fetch("quiz.json");
      this.quizData = await response.json();
    } catch (e) {
      this.rootElm.innerText = "問題の読み込みに失敗しました";
      console.log(e);
    }
  }

  displayStartView() {
    const levelStrs = Object.keys(this.quizData);
    const optionStrs = [];
    for (let i = 0; levelStrs.length > i; i++) {
      optionStrs.push(`
          <option value="${levelStrs[i]}" name="level">レベル${i + 1}</option>
        `);
    }

    const html = `
      <select class="levelSelector">
        ${optionStrs.join("")}
      </select>
      <button class="startBtn">スタート</button>
    `;

    const parentElm = document.createElement("div");
    parentElm.innerHTML = html;

    const startBtnElm = parentElm.querySelector(".startBtn");
    startBtnElm.addEventListener("click", () => {
      this.displayQuestionView();
    });

    // this.rootElm.appendChild(parentElm); // 削除
    this.replaceView(parentElm);
  }

  displayQuestionView() {
    const html = `
      <p>ゲームを開始しました</p>
      <button class="retireBtn">ゲームを終了する</button>
    `;

    const parentElm = document.createElement("div");
    parentElm.className = "question";
    parentElm.innerHTML = html;

    const retireBtnElm = parentElm.querySelector(".retireBtn");
    retireBtnElm.addEventListener("click", () => {
      this.displayResultView();
    });

    // this.rootElm.innerHTML = ""; // 削除
    // this.rootElm.appendChild(parentElm); // 削除
    this.replaceView(parentElm);
  }

  displayResultView() {
    const html = `
      <p>ゲーム終了</p>
      <button class="resetBtn">開始画面に戻る</button>
    `;

    const parentElm = document.createElement("div");
    parentElm.className = "results";
    parentElm.innerHTML = html;

    const resetBtnElm = parentElm.querySelector(".restBtn");
    resetBtnElm.addEventListener("click", () => {
      this.displayStartView();
    });

    this.replaceView(parentElm);
  }

  replaceView(elm) {
    this.rootElm.innerHTML = "";
    this.rootElm.appendChild(elm);
  }
}

new WordQuiz(document.getElementById("app")).init();
