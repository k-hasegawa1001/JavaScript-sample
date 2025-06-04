function createClosure() {
  const value = "myClosureValue";

  function myClosure() {
    // valueはmyClosureの外ではあるが、myClosureと同じcreateClosureの関数スコープにいるので束縛する
    console.log(value);
  }
  return myClosure;
}

const closure = createClosure();
closure();

function createCounterObject() {
  return {
    value: 0,
    up: function () {
      // 値を一つ増やす関数
      this.value++;
    },
    down: function () {
      // 値を一つ減らす関数
      this.value--;
    },
  };
}

const counterObj = createCounterObject();
counterObj.up();
counterObj.up();
counterObj.value = 10;
counterObj.down();
console.log(counterObj.value); // => 9

function createCounter() {
  // この値は外からいじることができない
  let value = 0;
  return {
    up: function () {
      value++;
    },
    down: function () {
      value--;
    },
    getValue: function () {
      return value;
    },
  };
}

const counter = createCounter();
counter.up();
counter.up();
counter.down();
// counter.value = 10; // valueは公開されていないので、この操作では想定のvalueを変更できない
console.log(counter.getValue()); // => 1
