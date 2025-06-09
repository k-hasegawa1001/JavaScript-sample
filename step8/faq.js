function wait(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${sec}秒たちました`);
      // もしも失敗する時には以下のように呼ぶと失敗を知らされる
      // reject(new Error("エラーです"));
    }, sec * 1000);
  });
}

wait(3)
  .then((msg) => {
    // ここは3秒後にコールされる
    console.log(msg); // => 3秒たちました
  })
  .catch((err) => {
    console.log(err.message);
  });

async function wait3sec() {
  const msg = await wait(3);
  // 3秒後に下記が実行される
  console.log(msg); // => 3秒たちました
}

async function waitMultiple() {
  const promises = [wait(3), wait(5)];

  const messages = await Promise.all(promises);
  console.log(messages);
}

waitMultiple();
