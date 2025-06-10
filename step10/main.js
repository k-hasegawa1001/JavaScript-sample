class WordQuiz {
  constructor(rootElm) {
    this.rootElm = rootElm;

    // ゲームのステータス
    this.gameStatus = {
      level: null, // 選択されたレベル
    };
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
    this.gameStatus.level = levelStrs[0];
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

    const selectorElm = parentElm.querySelector(".levelSelector");
    selectorElm.addEventListener("change", (event) => {
      this.gameStatus.level = event.target.value;
    });

    const startBtnElm = parentElm.querySelector(".startBtn");
    startBtnElm.addEventListener("click", () => {
      this.displayQuestionView();
    });

    this.replaceView(parentElm);
  }

  displayQuestionView() {
    console.log(`選択中のレベル：${this.gameStatus.level}`);
    const stepKey = "step1";
    const currentQuestion = this.quizData[this.gameStatus.level][stepKey];

    const choiceStrs = [];
    for (const choice of currentQuestion.choices) {
      choiceStrs.push(`
          <label>
            <input type="radio" name="choice" value="${choice}" />${choice}
          </label>
        `);
    }
    const html = `
      <p>${currentQuestion.word}</p>
      <div>
        ${choiceStrs.join("")}
      </div>
      <div class="actions">
        <button class="nextBtn">解凍する</button>
      </div>
    `;

    const parentElm = document.createElement("div");
    parentElm.className = "question";
    parentElm.innerHTML = html;

    // const retireBtnElm = parentElm.querySelector(".retireBtn"); // 削除
    // retireBtnElm.addEventListener("click", () => {
    //   this.displayResultView();
    // });

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

    const resetBtnElm = parentElm.querySelector(".resetBtn");
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
