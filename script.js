// Taking all the buttobns from API

const loadBtn = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((data) => displayBtns(data.data));
};
//  ButtonDivs Arives
const displayBtns = (btns) => {
  // console.log(btns);
  const btnContainer = document.getElementById("divBtn");
  btnContainer.innerHTML = "";
  for (let btn of btns) {
    const buttondiv = document.createElement("div");
    buttondiv.innerHTML = `
    <button id="lesson-${btn.level_no}" onclick="btnOnclick(${btn.level_no})" class="btn btn-outline btn-primary text-xl font-normal all-Buttons">
          lession-${btn.level_no}

        </button>`;

    btnContainer.appendChild(buttondiv);
  }
};

// button onclick function
const btnOnclick = (id) => {
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const activeBtn = document.getElementById(`lesson-${id}`);
      const allButtons = document.querySelectorAll(".all-Buttons");
      for (let btn of allButtons) {
        btn.classList.remove("btnDivBg");
      }
      activeBtn.classList.add("btnDivBg");

      displayLessons(data.data);
    });
};

// displayings Each lessons words
const displayLessons = (lessons) => {
  const wordsContainer = document.getElementById("word-container");
  wordsContainer.innerHTML = "";

  if (lessons.length == 0) {
    wordsContainer.innerHTML = `
    <div class="space-y-2 col-span-full p-6">
    <img class="mx-auto" src="./assets/alert-error.png" alt="" />
          <p class="bangla-font text-gray-600 text-xl">
           এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </p>
          <p class="bangla-font whitespace-nowrap text-3xl font-semibold">
            নেক্সট Lesson এ যান
          </p>
        </div>
    `;
  }

  for (let word of lessons) {
    // console.log(word);

    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
<div
          class="text-center bg-white rounded-xl p-8 space-y-4 shadow-xl shadow-gray-200 hover:shadow-gray-400"
        >
          <p class="text-2xl font-bold">${
            word.word ? word.word : "দুক্ষিত,শব্দ পাওয়া যায়নি"
          }</p>
          <p class="font-semibold">Meaning/Pronounciation</p>
          <p class="font-bangla font-semibold text-2xl">"${
            word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
          } / ${
      word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"
    }"</p>
          <div class="flex justify-between items-center">
            <button
              class="bg-cyan-100 p-2 text-center rounded-md hover:bg-cyan-300"
            >
              <i class="fa-solid fa-circle-info"></i>
            </button>
            <button
              class="bg-cyan-100 p-2 text-center rounded-md hover:bg-cyan-300"
            >
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>

    `;
    wordsContainer.appendChild(wordDiv);
  }
};

loadBtn();
