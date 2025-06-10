import { ToDo } from "./ToDo.js";
import { ToDoCreate } from "./ToDoCreate.js";
import { Main } from "./Main.js";

export class ToDoList extends ToDo {
  constructor() {
    super();
    console.log("\ncreated ToDoList instance");
  }

  async init() {
    console.log("ToDoList : init()");

    this.todos = await this.getToDos();

    this.listElm = document.createElement("div");
    this.listElm.id = "todoList";

    // debug
    const debugMessage = "here is element : id=todoList<br>";
    // /debug

    let createToDoButton = "<button id='createToDoButton'>新規作成</button>";

    this.listElm.innerHTML = createToDoButton + "<ul class='list'></ul>";

    this.rootElm.appendChild(this.listElm);

    this.createToDoButtonElm = document.getElementById("createToDoButton");
    this.createToDoButtonElm.addEventListener("click", () => {
      // ToDo新規作成
      // alert("pushed button : createToDo");
      let cnt = 0;

      for (const todo of this.todos) {
        cnt++;
      }

      const todoCreate = new ToDoCreate(cnt);
      todoCreate.init();
    });

    this.displayToDoList();
  }

  async getToDos() {
    console.log("ToDoList : getToDos()");
    const todoResponse = await fetch("../../json/todo.json");
    return todoResponse.json();
  }

  async saveTodos() {
    console.log("ToDoList : saveToDos()");
    // localStorage.setItem("../../json/todo.json", JSON.stringify(this.todos));
    try {
      const response = await fetch("/api/updateToDos", {
        // ★サーバー側の新しいAPIエンドポイント★
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.todos),
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
    console.log(this.todos);
  }

  async displayToDoList() {
    console.log(this.todos);
    console.log("ToDoList : displayToDoList()");
    const listElm = this.listElm.querySelector(".list");
    // console.log(listElm.tagName);
    // let content = "";

    ////////////
    this.todos.forEach((todo) => {
      const listItem = document.createElement("li");
      listItem.dataset.id = todo.id;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;

      // ★ ここがイベントリスナーの設定箇所です ★
      checkbox.addEventListener("change", () => {
        if ((todo.isFinished = true)) todo.isFinished = false;
        else todo.isFinished = true;

        this.saveTodos(); // データ変更後に保存
        // renderTodos(); // UIを再描画して変更を反映
      });

      const span = document.createElement("span");
      span.textContent = todo.content;

      // ★ ここが文字色を変更する箇所です ★
      if (todo.isFinished) {
        span.style.textDecoration = "line-through"; // 取り消し線
        span.style.color = "#888"; // グレーアウト
      } else {
        span.style.textDecoration = "none"; // 取り消し線なし
        span.style.color = "#333"; // 通常の色（例: 濃いグレー）
      }

      // const deleteButton = document.createElement("button");
      // deleteButton.textContent = "削除";
      // deleteButton.addEventListener("click", () => {
      //   todos = todos.filter((t) => t.id !== todo.id);
      //   saveTodos(); // データ変更後に保存
      //   renderTodos();
      // });

      listItem.appendChild(checkbox);
      listItem.appendChild(span);
      // listItem.appendChild(deleteButton);
      this.listElm.appendChild(listItem);
    });

    // for (const plan of this.todos) {
    //   content += `
    //   <li class="plan" style="list-style: none;">
    //     <span><input type="checkbox" class="chanegeIsFinished"></span>
    //     <span class="content">${plan.content}</span>
    //   </li>
    // `;
    // }
    // listElm.innerHTML = content;
  }
  ////////////////////

  // async getLength() {
  //   const todos = await this.getToDos();
  //   let cnt = 0;
  //   for (const todo of todos) {
  //     cnt++;
  //   }
  //   return cnt;
  // }
}
