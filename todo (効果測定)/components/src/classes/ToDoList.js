export class ToDoList {
  constructor() {
    console.log("created ToDoList instance");
    this.rootElm = document.getElementById("todo");
    const debugMessage = "here is element : id=todo";

    this.rootElm.innerText = debugMessage;
  }

  init() {
    this.listElm = document.createElement("div");
    this.listElm.id = "todoList";

    // debug
    console.log("ToDoList : init()");
    const debugMessage = "here is element : id=todoList<br>";
    // /debug

    let content = "<button id='createToDo'>新規作成</button>";

    this.listElm.innerHTML = debugMessage + content + "<ul class='list'></ul>";

    this.rootElm.appendChild(this.listElm);

    this.createToDoButtonElm = document.getElementById("createToDo");
    this.createToDoButtonElm.addEventListener("click", () => {
      // ToDo新規作成
      alert("pushed button : createToDo");
    });

    this.displayToDoList();
  }

  async getToDos() {
    console.log("ToDoList : getToDos()");
    const todoResponse = await fetch("../../json/todo.json");
    return todoResponse.json();
  }

  async displayToDoList() {
    const todos = await this.getToDos();
    console.log(todos);
    console.log("ToDoList : displayToDoList()");
    const listElm = this.listElm.querySelector(".list");
    // console.log(listElm.tagName);
    let content = "";

    for (const plan of todos) {
      content += `
      <li class="plan" style="list-style: none;">
        <span><input type="checkbox"></span>
        <span class="content">${plan.content}</span>
      </li>
    `;
    }
    listElm.innerHTML = content;
  }
}
