function MyClass() {
  this.name = "これはMyClassです";
}

MyClass.prototype.test = function () {
  console.log(this === instance); //「true」もしくは「false」
};

const instance = new MyClass();
instance.test();
