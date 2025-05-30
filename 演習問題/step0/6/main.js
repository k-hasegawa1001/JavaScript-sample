var lst = document.getElementById("lst");

elms = "";

for (var i = 1; i <= 10; i++) {
  elms += "<li>" + i + "</li>";
  console.log(i);
}

lst.innerHTML = elms;
