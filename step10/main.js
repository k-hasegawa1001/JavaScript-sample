class WordQuiz {
  constructor(rootElm) {
    // console.log("インスタンスが作成されたよ"); // 削除
    this.rootElm = rootElm;
  }

  async init() {
    try {
      const response = await fetch("quiz.json");
      this.quizData = await response.json();
      // console.log(this.quizData); // 削除
    } catch (e) {
      this.rootElm.innerText = "問題の読み込みに失敗しました";
      console.log(e);
    }
  }
}
new WordQuiz(document.getElementById("app")).init();
