// todo/components/src/index.js (サーバーのメインファイル)

// fsモジュールをPromise APIでインポートする
const http = require("node:http");
const fs = require("node:fs/promises"); // fs/promises を使用
const path = require("node:path");

const hostname = "127.0.0.1";
const port = 3002;

// __dirname は現在のファイル (todo/components/src/index.js) のディレクトリパス
// プロジェクトルート (todo) のパスを取得
const projectRoot = path.resolve(__dirname, "..", ".."); // 'todo/components/src' -> 'todo/components' -> 'todo'

// 各ファイルの絶対パスを定義
// components/view/index.html
const htmlFilePath = path.join(projectRoot, "components", "view", "index.html");
// components/css/index.css
const cssFilePath = path.join(projectRoot, "components", "css", "index.css");
// components/src/main.js
const mainJsFilePath = path.join(projectRoot, "components", "src", "main.js");
// components/src/createTodo.js （HTMLからのパスが/src/createTodo.jsなら対応）
const createTodoJsFilePath = path.join(projectRoot, "components", "src", "createTodo.js");
// components/src/classes/Main.js
const MainJsFilePath = path.join(projectRoot, "components", "src", "classes", "Main.js");
// components/src/classes/ToDo.js
const ToDoJsFilePath = path.join(projectRoot, "components", "src", "classes", "ToDo.js");
// components/src/classes/ToDoCreate.js
const ToDoCreateJsFilePath = path.join(projectRoot, "components", "src", "classes", "ToDoCreate.js");
// components/src/classes/ToDoListRef.js
const ToDoListRefJsFilePath = path.join(projectRoot, "components", "src", "classes", "ToDoListRef.js");

// JSONファイルのパス (todo/json/todo.json)
const todoJsonFilePath = path.join(projectRoot, "json", "todo.json");

// サービングするファイルとそれに対応するContent-Typeをマップするオブジェクト
// これにより、if-else if の羅列を避け、拡張性を持たせることができます。（ここではまだ手動で追加）
const fileMap = {
  "/": { path: htmlFilePath, contentType: "text/html" },
  "/index.html": { path: htmlFilePath, contentType: "text/html" },
  "/css/index.css": { path: cssFilePath, contentType: "text/css" },
  "/src/main.js": { path: mainJsFilePath, contentType: "application/javascript" },
  "/src/createTodo.js": { path: createTodoJsFilePath, contentType: "application/javascript" },
  "/src/classes/Main.js": { path: MainJsFilePath, contentType: "application/javascript" },
  "/src/classes/ToDo.js": { path: ToDoJsFilePath, contentType: "application/javascript" },
  "/src/classes/ToDoCreate.js": { path: ToDoCreateJsFilePath, contentType: "application/javascript" },
  "/src/classes/ToDoListRef.js": { path: ToDoListRefJsFilePath, contentType: "application/javascript" },
  "/json/todo.json": { path: todoJsonFilePath, contentType: "application/json" },
};

console.log("Server will serve files from:");
for (const url in fileMap) {
  if (fileMap[url].contentType.startsWith("text/html") || fileMap[url].contentType.startsWith("application/javascript") || fileMap[url].contentType.startsWith("text/css")) {
    console.log(`  ${url} -> ${fileMap[url].path}`);
  }
}
console.log(`JSON data will be managed at: ${todoJsonFilePath}`);

// HTTPサーバーの作成 (asyncを使用)
const server = http.createServer(async (req, res) => {
  try {
    // 静的ファイルのサービング
    if (fileMap[req.url]) {
      const { path: filePath, contentType } = fileMap[req.url];
      const data = await fs.readFile(filePath); // 'utf8' を指定しない場合、Bufferで読み込まれる
      res.writeHead(200, { "Content-Type": `${contentType}; charset=utf-8` });
      res.end(data);
    }
    // JSONデータを保存するAPIエンドポイント
    else if (req.url === "/api/todos" && req.method === "POST") {
      let body = "";
      // リクエストボディのデータを集める
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      // リクエストボディの受信が完了したら
      await new Promise((resolve) => req.on("end", resolve)); // 'end'イベントをPromiseで待つ

      const newToDoData = JSON.parse(body); // 受信したJSON文字列をJavaScriptオブジェクトに変換
      console.log("Received new ToDo:", newToDoData);

      let existingTodos = [];
      try {
        const jsonContent = await fs.readFile(todoJsonFilePath, "utf8");
        existingTodos = JSON.parse(jsonContent);
        if (!Array.isArray(existingTodos)) {
          // JSONが配列でない場合を考慮
          console.warn("todo.json content is not an array, reinitializing.");
          existingTodos = [];
        }
      } catch (readErr) {
        if (readErr.code === "ENOENT") {
          console.log("todo.json not found, creating a new file.");
          // ファイルが存在しない場合は空の配列から始める
        } else {
          // その他の読み込みエラーはログに出力し、空の配列として扱う
          console.error("Error reading existing todo.json:", readErr);
          existingTodos = [];
        }
      }

      // 新しいToDoを既存のリストに追加し、IDを採番 (サーバー側で管理)
      const nextId = existingTodos.length > 0 ? Math.max(...existingTodos.map((t) => t.id || 0)) + 1 : 1; // 既存IDがない場合も考慮
      newToDoData.id = nextId;

      existingTodos.push(newToDoData);

      // 更新されたToDoリストをJSONファイルに書き込む
      await fs.writeFile(todoJsonFilePath, JSON.stringify(existingTodos, null, 2), "utf8");

      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ message: "ToDo added successfully!", todo: newToDoData }));
    }
    // JSONデータを取得するAPIエンドポイント
    else if (req.url === "/api/todos" && req.method === "GET") {
      try {
        const jsonContent = await fs.readFile(todoJsonFilePath, "utf8");
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(jsonContent);
      } catch (readErr) {
        if (readErr.code === "ENOENT") {
          res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
          res.end("[]"); // ファイルが存在しない場合は空の配列を返す
        } else {
          console.error("Error reading todo.json for GET request:", readErr);
          res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
          res.end(JSON.stringify({ error: "Failed to read ToDo data." }));
        }
      }
    } else if (req.url === "/api/updateToDos" && req.method === "POST") {
      let body = "";
      // リクエストボディのデータを集める
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      console.log(body);

      // リクエストボディの受信が完了したら
      await new Promise((resolve) => req.on("end", resolve)); // 'end'イベントをPromiseで待つ

      let existingTodos = [];

      const newToDos = JSON.parse(body);

      //   existingTodos.push(newToDos);

      //   console.log(existingTodos);

      // 更新されたToDoリストをJSONファイルに書き込む
      await fs.writeFile(todoJsonFilePath, JSON.stringify(newToDos, null, 2), "utf8");

      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ message: "ToDo added successfully!", todo: newToDos }));
    }
    // Favicon リクエストの無視
    else if (req.url === "/favicon.ico") {
      res.writeHead(204); // No Content
      res.end();
    }
    // その他のリクエスト (404 Not Found)
    else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("404 Not Found\n");
    }
  } catch (err) {
    // 全体のエラーハンドリング
    console.error("Unhandled server error:", err);
    // readFileのエラーがENOENTなら404、それ以外は500
    if (err.code === "ENOENT") {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("404 Not Found: Resource or file not found.\n");
    } else {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end(`Internal Server Error: ${err.message || "Unknown error"}\n`);
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
