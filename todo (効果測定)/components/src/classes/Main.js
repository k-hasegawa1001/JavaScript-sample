import { ToDoList } from "./ToDoList.js";

export class Main {
  constructor() {
    console.log("created Main instance");
  }

  init() {
    console.log("Main : init()");
    const toDoList = new ToDoList();
    toDoList.init();
  }
}
