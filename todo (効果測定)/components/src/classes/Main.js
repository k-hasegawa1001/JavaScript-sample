import { ToDoCreate } from "./ToDoCreate.js";
import { ToDoListRef } from "./ToDoListRef.js";

export class Main {
  constructor() {
    console.log("created Main instance");
  }

  init() {
    console.log("Main : init()");
    const todoList = new ToDoListRef();
    todoList.init();
  }
}
