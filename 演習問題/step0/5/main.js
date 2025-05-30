var lst = document.getElementById("lst");

elms = "";

for (var i = 1; i <= 10; i++) {
  elms += "<li>" + i + "</li>";
}

lst.innerHTML = elms;
