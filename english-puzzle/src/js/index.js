import "../css/style.css";
import "../css/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import getWords from "./API/getWords";
import store from "./store";

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

class Pazzle {
  constructor(words) {
    this.round = this.createRound(words);
    this.pazzle = [[], [], [], [], [], [], [], [], [], []];
    this.currentSentance = this.round.pop();
  }

  createRound(words) {
    const roundSentences = words;
    console.log("words", words);
    const round = [[], [], [], [], [], [], [], [], [], []];
    roundSentences.slice(0, 10).forEach(({ textExample }, sentanceIndex) => {
      textExample.split(" ").forEach((word, wordIndex, arr) => {
        const part = new Part(
          this,
          sentanceIndex,
          wordIndex,
          word,
          arr.length - 1 === wordIndex
        );
        const length = arr.length - 1;
        let randIndex = randomInteger(0, length);
        while (round[sentanceIndex][randIndex]) {
          randIndex = randomInteger(0, length);
        }
        round[sentanceIndex][randIndex] = part;
      });
    });
    return round;
  }

  putToPazzle(item) {
    const sentanceIndex = 10 - this.round.length;
    this.pazzle[sentanceIndex].push(item);

    this.currentSentance.splice(this.currentSentance.indexOf(item), 1);

    this.render();
  }

  render() {
    const pazzleContainer = document.querySelector(
      ".puzzle-container__results"
    );

    const currentSentanceContainer = document.querySelector(
      ".puzzle-container__workspace"
    );

    currentSentanceContainer.innerHTML = "";
    pazzleContainer.innerHTML = "";
    console.log(this);
    this.pazzle.forEach((sentance) => {
      const resultSentence = document.createElement("div");
      resultSentence.classList.add("result-sentence");
      sentance.forEach((word) => resultSentence.append(word.render()));
      pazzleContainer.append(resultSentence);
    });

    this.currentSentance.forEach((word) => {
      currentSentanceContainer.append(word.render());
    });
  }
}

class Part {
  constructor(parent, sentance, pos, content, isLast) {
    this.target = [sentance, pos];
    this.isLast = isLast;
    this.targetCurr = [];
    this.corect = false;
    this.inPazzle = false;
    this.content = content;
    this.parent = parent;
  }

  putToPazzle(sentance, pos) {
    this.targetCurr = [sentance, pos];
    this.inPazzle = true;
    this.parent.putToPazzle(this);
  }

  check() {
    this.corect = this.target.join("") === this.targetCurr.join("");
  }

  render() {
    const maskStart = document.createElement("div");
    maskStart.classList.add("mask");
    const maskEnd = document.createElement("div");
    maskEnd.classList.add("mask");
    const wordContainer = document.createElement("div");
    wordContainer.classList.add("word-container");
    const word = document.createElement("span");
    word.classList.add("word");
    word.innerHTML = this.content;
    // console.log(word);
    // if (this.target[1] === 0)
    //   wordContainer.style =
    //     "clip-path: polygon(calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 0 0);";
    // else if (this.isLast)
    //   wordContainer.style =
    //     "clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 100%, 20px 50%, 0 0);";
    // else
    //   wordContainer.style =
    //     "clip-path: polygon(calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%, 0 0);";
    wordContainer.style = this.inPazzle ? "background-color: red;" : "";
    wordContainer.append(maskStart);
    wordContainer.append(word);
    wordContainer.append(maskEnd);

    !this.inPazzle &&
      wordContainer.addEventListener("click", this.putToPazzle.bind(this));

    return wordContainer;
  }
}

async function addNewSentence(i) {
  // const roundSentences = await getWords(store.level, store.round);
  // const currentSentence = roundSentences[i].textExample;
  // const arr = currentSentence.split(' ');
  // const resultSentence = document.createElement('div');
  // resultSentence.classList.add('result-sentence');
  // document.querySelector('.puzzle-container__results').append(resultSentence);
  // arr.forEach((element, index) => {
  //   const maskStart = document.createElement('div');
  //   maskStart.classList.add('mask');
  //   const maskEnd = document.createElement('div');
  //   maskEnd.classList.add('mask');
  //   const wordContainer = document.createElement('div');
  //   wordContainer.classList.add('word-container');
  //   const word = document.createElement('span');
  //   word.classList.add('word');
  //   word.innerHTML = element;
  //   console.log(word);
  //   if (index === 0) wordContainer.style = "clip-path: polygon(calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 0 0);"
  //   else if (index === arr.length-1) wordContainer.style = "clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 100%, 20px 50%, 0 0);"
  //   else wordContainer.style = "clip-path: polygon(calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%, 0 0);"
  //   wordContainer.append(maskStart);
  //   wordContainer.append(word);
  //   wordContainer.append(maskEnd);
  //   document.querySelector('.puzzle-container__workspace').append(wordContainer);
  //   wordContainer.addEventListener('click', (e) => {
  //     resultSentence.append(wordContainer);
  //   })
  // });
}

// addNewSentence(0);
getWords(store.level, store.round).then((words) => {
  const pazzle = new Pazzle(words);
  // pazzle.round = Pazzle.createRound(words);
  // console.log(pazzle);
  pazzle.render();
});
