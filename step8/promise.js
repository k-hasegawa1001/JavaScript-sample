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
