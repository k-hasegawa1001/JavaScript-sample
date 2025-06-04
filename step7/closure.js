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
