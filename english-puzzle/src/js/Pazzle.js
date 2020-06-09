/* eslint-disable class-methods-use-this */
import Part from './Part';
import templates from './templates';

class Pazzle {
    constructor(sentenses) {
      this.rightRound = [[], [], [], [], [], [], [], [], [], []];
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
            word,
            arr.length - 1 === wordIndex
          );
          this.rightRound[sentanceIndex].push(part);
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
  
    render(argument) {
      const pazzleContainer = document.querySelector(".puzzle-container__results");
  
      const currentSentanceContainer = document.querySelector(".puzzle-container__workspace");
  
      currentSentanceContainer.innerHTML = "";
      pazzleContainer.innerHTML = "";
      this.pazzle.forEach((sentance) => {
        const resultSentence = document.createElement("div");
        resultSentence.classList.add("result-sentence");
        sentance.forEach((word) => {
            if (argument === 'check') resultSentence.append(word.render(argument));
            else resultSentence.append(word.render())
        });
        pazzleContainer.append(resultSentence);
      });

      if (argument === 'dont know') {
        this.pazzle[10 - this.round.length - 1].length = 0;  
        document.querySelectorAll('.result-sentence')[10 - this.round.length - 1].innerHTML = "";
        this.rightRound[this.round.length].forEach((el) => {
            document.querySelectorAll('.result-sentence')[10 - this.round.length - 1].append(el.render(argument));
        })
      }
      if (!argument) {
        this.currentSentance.forEach((word) => {
            currentSentanceContainer.append(word.render());
        });
      }
        
      document.querySelector('.puzzle-container__buttons-container').innerHTML = templates.buttonDontKnow;
      if (this.currentSentance.length === 0) {
        document.querySelector('.puzzle-container__buttons-container').innerHTML += templates.buttonCheck;
        this.check();
      }
      this.dontKnow();
    }

    randomInteger(min, max) {
        const rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    check() {
        document.querySelector('.check-container').addEventListener('click', () => {
            this.render('check');
        })
    }

    dontKnow() {
        document.querySelector('.dont-know-container').addEventListener('click', () => {
            this.render('dont know');
        })
    }
  }

  export default Pazzle;