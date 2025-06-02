const obj1 = {
  name: "これはobj1です",
  test: function () {
    console.log(this);
    console.log(this === obj1);
  },
};

console.log(obj1); // => {name: "これはobj1です", test: f}

obj1.test();
// => {name: "これはobj1です", test: f}
// => true

class MyClass {
  constructor() {
    this.name = "これはMyClassです";
  }

  test() {
    console.log(this);
    console.log(this === instance1);
  }
}

const instance1 = new MyClass();

console.log(instance1); // >= MyClass { name: "これはMyClassです" }

instance1.test();
// => MyClass { name: "これはMyClassです" }
// => true
