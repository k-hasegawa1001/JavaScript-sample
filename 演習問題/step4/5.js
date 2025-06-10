const testObj = {
  name: "演習4_5",
  test: function () {
    console.log(this === testObj); //「true」もしくは「false」
  },
};

testObj.test();
