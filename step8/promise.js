function fetchHello() {
  const promise = fetch("./hello.json");

  const onFulfilled = (data) => {
    console.log("通信成功しました");
  };

  const onRejected = (err) => {
    console.log("通信失敗しました");
  };

  return promise.then(onFulfilled, onRejected);
}

// 実際は以下のように書くことが多い
function fetchHello() {
  return fetch("./hello.json").then(
    (data) => {
      console.log("通信成功しました");
    },
    (err) => {
      console.log("通信失敗しました");
    }
  );
}

function displayMessagePromise() {
  return fetch("./hello.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const messageElm = document.getElementById("message");
      messageElm.innerHTML = data.message;
      console.log("終了");
    });
}

displayMessagePromise().then(() => {
  console.log("displayMessageが終わりました");
});

// 最近ではthenの第二引数処理を使わずに、catch関数を利用することが多い
function displayMessagePromise() {
  return fetch("./hello.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const messageElm = document.getElementById("message");
      messageElm.innerHTML = data.message;
      // 例えば以下のように例外が発生してもcatch関数で捕まえられる
      // throw new Error("テストエラー");
      console.log("終了");
    })
    .catch((err) => {
      console.log(`displayMessagePromiseの処理中にエラーが発生しました：${err.message}`);
    });
}

async function displayMessage() {
  try {
    const response = await fetch("./hello.json");
    const data = await response.json();
    const messageElm = document.getElementById("message");
    messageElm.innerHTML = data.message;
    console.log("終了");
  } catch (err) {
    console.log(`displayMessageの処理中にエラーが発生しました：${err.message}`);
  }
}
