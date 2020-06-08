/* eslint-disable class-methods-use-this */
import Part from './Part';
import templates from './templates';

class Pazzle {
    constructor(sentenses) {
      this.round = this.createRound(sentenses);
      this.pazzle = [[], [], [], [], [], [], [], [], [], []];
      this.currentSentance = this.round.pop();
      this.countWord = this.currentSentance.length;
    }
  
    createRound(sentenses) {
      const roundSentences = sentenses;
      console.log("words", sentenses);
      const round = [[], [], [], [], [], [], [], [], [], []];
      roundSentences.slice(0, 10).forEach(({ textExample }, sentanceIndex) => {
        textExample.split(" ").forEach((word, wordIndex, arr) => {
          const part = new Part(
            this,
            sentanceIndex,
            wordIndex,
            word.match(/(?<=>).+(?=<)/) || word,
            arr.length - 1 === wordIndex
          );
          const length = arr.length - 1;
          let randIndex = this.randomInteger(0, length);
          while (round[sentanceIndex][randIndex]) {
            randIndex = this.randomInteger(0, length);
          }
          round[sentanceIndex][randIndex] = part;
        });
      });
      return round;
    }
  
    putToPazzle(item) {
      const sentanceIndex = 10 - this.round.length - 1;
      this.currentSentenceIndex = sentanceIndex;
      this.pazzle[sentanceIndex].push(item);
  
      this.currentSentance.splice(this.currentSentance.indexOf(item), 1);
  
      this.render();
      
    }
  
    render() {
      const pazzleContainer = document.querySelector(".puzzle-container__results");
  
      const currentSentanceContainer = document.querySelector(".puzzle-container__workspace");
  
      currentSentanceContainer.innerHTML = "";
      pazzleContainer.innerHTML = "";
      // console.log(this);
      this.pazzle.forEach((sentance) => {
        const resultSentence = document.createElement("div");
        resultSentence.classList.add("result-sentence");
        sentance.forEach((word) => resultSentence.append(word.render()));
        pazzleContainer.append(resultSentence);
      });
  
      this.currentSentance.forEach((word) => {
        currentSentanceContainer.append(word.render());
      });
      
      if (this.currentSentance.length === 0) {
        document.querySelector('.puzzle-container__buttons-container').innerHTML = templates.buttonCheck;
        this.check();
      }

    }

    randomInteger(min, max) {
        const rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    check() {
        document.querySelector('.check-container').addEventListener('click', () => {
            document.querySelectorAll('.result-sentence .word-container').forEach(el => {
                let part = this.pazzle[this.currentSentenceIndex].find(item => item.content === el.textContent);
                if (part === undefined) {
                   part = this.pazzle[this.currentSentenceIndex].find(item => item.content[0] === el.textContent);
                } 
                if (part.corect === true) {
                    el.style = "border: 1px solid blue;"
                } else el.style = "border: 1px solid red;"
            })
        })
    }
  }

  export default Pazzle;