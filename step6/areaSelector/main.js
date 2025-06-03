const rootElm = document.getElementById("areaSelector");

async function getPrefs() {
  const prefResponse = await fetch("./prefectures.json");
  return await prefResponse.json();
}

// async function displayPrefs() { // 削除
//   const result = await getPrefs();
//   console.log(result);
// }

async function updatePref() {
  const prefs = await getPrefs();
  createPrefOptionsHtml(prefs);
}

function createPrefOptionsHtml(prefs) {
  const optionStrs = [];
  for (const pref of prefs) {
    optionStrs.push(`
        <option name="${pref.name}" value="${pref.code}">
            ${pref.name}
        </option>
    `);
  }

  const prefSelectorElm = rootElm.querySelector(".prefectures");
  prefSelectorElm.innerHTML = optionStrs.join("");
}

// displayPrefs(); // 削除
updatePref();
