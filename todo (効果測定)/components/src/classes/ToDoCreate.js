// components/src/classes/ToDoCreate.js

import { Main } from "./Main.js";
import { ToDo } from "./ToDo.js";
import { ToDoListRef } from "./ToDoListRef.js";

// const fs = require("node:fs"); // ★この行は削除またはコメントアウト！★

export class ToDoCreate extends ToDo {
  constructor(nowCnt) {
    super();
    this.index = nowCnt;
    console.log("\nCreated ToDoCreate instance");
  }

  init() {
    console.log("ToDoCreate : init()");

    this.createToDoElm = document.createElement("div");
    this.createToDoElm.id = "createToDo";

    const debugMessage = "here is element : id=createToDo<br>";
    const titleHtml = "<h2>新規作成</h2>";
    const returnListHtml = `
            <div class='leftItem'>
                <button class='returnList'>追加をやめる</button>
            </div>
        `;
    const formHtml = `
            <div class="centerItem">
                <p>here is element : form</p>
                <textarea class="content" /></textarea>
                <br>
                <button class="createButton">作成する</button>
            </div>
        `;
    this.createToDoElm.innerHTML = debugMessage + titleHtml + formHtml + returnListHtml;
    // this.rootElm はおそらく ToDoクラスかMainクラスで定義されているものと思われます
    // document.body.appendChild(this.createToDoElm);
    this.rootElm.appendChild(this.createToDoElm);
    // TODO: rootElmが正しく設定されているか確認

    // 戻るボタンのイベントリスナー
    const returnListButtonElm = this.createToDoElm.querySelector(".returnList");
    returnListButtonElm.addEventListener("click", () => {
      new Main().init();
    });

    const createButton = this.createToDoElm.querySelector(".createButton");
    createButton.addEventListener("click", () => {
      this.createToDoExecute();
    });
  }

  // ToDo作成実行ロジック
  async createToDoExecute() {
    // ★非同期処理になるので async を追加★
    console.log("ToDoCreate : createToDoExecute()");
    const content = this.createToDoElm.querySelector(".content").value;

    const newToDo = {
      id: this.index + 1, // ここでのidは仮のものかもしれません
      content: content,
      isFinished: false,
    };

    // todoList.then((data) => { data[this.index] = newToDo; });
    // この部分はサーバーサイドのAPIで処理します。
    // クライアントサイドでは、新しく作成したToDoをサーバーに送信します。

    console.log("Sending new ToDo to server:", newToDo);

    try {
      const response = await fetch("/api/todos", {
        // ★サーバー側の新しいAPIエンドポイント★
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newToDo),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("ToDo successfully saved on server:", result);
        // サーバーからの応答に基づいて、リストを更新したり、元の画面に戻ったりする
        new Main().init(); // 成功したらリスト画面に戻るなど
      } else {
        const errorData = await response.json();
        console.error("Failed to save ToDo on server:", response.status, errorData);
        alert(`ToDoの保存に失敗しました: ${errorData.error || "不明なエラー"}`);
      }
    } catch (error) {
      console.error("Error sending ToDo to server:", error);
      alert("サーバーとの通信中にエラーが発生しました。");
    }

    // fs.writeFileSync("../../json/todo.json", todoList); // ★この行は削除！★
  }
}
