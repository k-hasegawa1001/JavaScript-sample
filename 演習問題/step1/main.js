function clock() {
  const dateElm = document.getElementsByClassName("date")[0];
  const timeElm = document.getElementsByClassName("time")[0];

  let now = new Date();

  let weekId = now.getDay();
  let week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  let dateMessage = `<p>${now.getFullYear()}.${now.getMonth()}.${now.getDate()} ${week[weekId]}</p>`;
  let timeMessage = `<p>${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}</p>`;
  dateElm.innerHTML = dateMessage;
  timeElm.innerHTML = timeMessage;
  setTimeout(() => {
    clock();
  }, 1000);
}

// const clock = () => {
//   const dateElm = document.getElementsByClassName("date")[0];
//   const timeElm = document.getElementsByClassName("time")[0];

//   let now = new Date();

//   let weekId = now.getDay();
//   let week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

//   let dateMessage = `<p>${now.getFullYear()}.${now.getMonth()}.${now.getDate()} ${week[weekId]}</p>`;

//   dateElm.innerHTML = dateMessage;
// };

// clock();

clock();
