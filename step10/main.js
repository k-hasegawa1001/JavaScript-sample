class WordQuiz {
  constructor(rootElm) {
    // console.log("インスタンスが作成されたよ"); // 削除
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
      console.log("スタートボタンがクリックされました。");
    });

    this.rootElm.appendChild(parentElm);
  }
}
new WordQuiz(document.getElementById("app")).init();
