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

const obj2 = {
  name: "これはobj2です",
};

obj2.test = obj1.test; // obj1の関数の参照をobj2に代入
obj2.test();

// 何も関数に囲まれていないグローバルスコープのthisはグローバルオブジェクト
console.log(this === window); // => true

function globalTest() {
  console.log(this === window); // => true
}

// オブジェクトに所有されていないのでthisはwindow
globalTest();

const objArrow = {
  name: "これはobjArrowです",
  test: function () {
    console.log("testの中です");
    console.log(this);

    const arrow = () => {
      console.log("arrowの中です");
      console.log(this); // {name: "これはobjArrowです", test: f}
      console.log(this === objArrow); // => true
    };

    const normal = function () {
      console.log("normalの中です");
      console.log(this); // => Window
      console.log(this === objArrow); // => false
    };

    arrow();
    normal();
  },
};

console.log(objArrow); // => {name: "これはobjArrowです", test: f}
objArrow.test();

const legacyObj = {
  name: "通常関数の場合",
  test: function () {
    const self = this;
    document.body.addEventListener("click", function () {
      console.log(self.name);
    });
  },
};

const arrowObj = {
  name: "アロー関数の場合",
  test: function () {
    document.body.addEventListener("click", () => {
      console.log(this.name); // これで適切にアクセスできる
    });
  },
};

function MyClass2() {
  this.name = "これはMyClass2です";
  console.log(this);
}

MyClass2.prototype.test = function () {
  console.log(this === instance2); // true
  console.log("test!");
};

const instance2 = new MyClass2();
instance2.test();
