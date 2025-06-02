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
