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
