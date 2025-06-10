export class ToDo {
  constructor() {
    console.log("created ToDo instance");
    this.rootElm = document.getElementById("todo");

    const debugMessage = "here is element : id=todo";
    this.rootElm.innerText = debugMessage;
  }
}
