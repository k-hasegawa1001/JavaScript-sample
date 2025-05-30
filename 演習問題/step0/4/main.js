var button = document.getElementById("button");

button.addEventListener("click", function () {
  var scoreStr = document.getElementById("score").value;
  var score = parseInt(scoreStr);
  console.log(scoreStr);
  if (score >= 80) {
    alert("合格です");
  } else [alert("不合格です")];
});
