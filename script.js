// loading function or spinner function
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
};

// synonyms showing in buttons

const createElement = (arr) => {
  const htmlElement = arr.map(
    (el) => `<span class="btn  font-semibold mb-3 text-gray-500">${el} </span>`
  );
  return htmlElement.join(" ");
};

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
    <button id="lesson-${btn.level_no}" onclick="btnOnclick(${btn.level_no})" class="btn btn-outline btn-primary text-xl font-semibold all-Buttons">
        <i class="fa-solid fa-book-open"></i>  lession-${btn.level_no}

        </button>`;

    btnContainer.appendChild(buttondiv);
  }
};

// button onclick function
const btnOnclick = (id) => {
  manageSpinner(true);
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
  // manageSpinner(true);
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
            <button onclick="loadDetails(${word.id})"
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
  manageSpinner(false);
};

// Word details...

const loadDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then((res) => res.json())
    .then((details) => displayDetails(details.data));
};
const displayDetails = (datas) => {
  console.log(datas);
  const detailsContainer = document.getElementById("details-container");

  const synonyms = datas.synonyms;

  detailsContainer.innerHTML = `<p class="font-bold text-2xl mb-3">${
    datas.word
  } (<i class="fa-solid fa-microphone-lines"></i>: ${datas.pronunciation})</p>
          <p class="font-bold">Meaning</p>
          <p class="bangla-font text-xl font-semibold mb-3 text-gray-500">${
            datas.meaning ? datas.meaning : "অর্থ পাওয়া যায়নি"
          }</p>

          <p class="font-bold">Example</p>
          <p class="text-xl font-semibold mb-3 text-gray-500">${
            datas.sentence
          }</p>
          <p class="font-bold mb-2">Synonyms</p>

<div class="space-x-2 mb-5">
            ${createElement(datas.synonyms)}
          </div>

          <button class="btn btn-primary text-lg">Complete Learning</button>`;

  document.getElementById("my_modal_5").showModal();
};

loadBtn();
