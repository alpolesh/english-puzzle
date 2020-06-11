/* eslint-disable class-methods-use-this */
import Part from './Part';
import templates from './templates';
import store from './store';
import createNewRound from './createNewRound';

class Pazzle {
    constructor(sentenses) {
      this.rightRound = [[], [], [], [], [], [], [], [], [], []];
      this.round = this.createRound(sentenses);
      this.pazzle = [[], [], [], [], [], [], [], [], [], []];
      this.currentSentance = this.round.pop();
      this.sentences = sentenses;
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
            arr.length - 1 === wordIndex,
            arr.length
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

      document.querySelector('.puzzle-container__buttons-container').innerHTML = templates.buttonDontKnow;

      if (this.currentSentance.length === 0) {
        document.querySelector('.puzzle-container__buttons-container').innerHTML += templates.buttonCheck;
        this.check();
      }
      this.dontKnow();

      if (argument === 'dont know') {
        this.pazzle[10 - this.round.length - 1].length = 0;  
        document.querySelectorAll('.result-sentence')[10 - this.round.length - 1].innerHTML = "";
        this.rightRound[this.round.length].forEach((el) => {
            document.querySelectorAll('.result-sentence')[10 - this.round.length - 1].append(el.render(argument));
        })
        document.querySelector('.puzzle-container__buttons-container').innerHTML = templates.buttonContinue;
        this.continue();
      }
      if (!argument) {
        this.currentSentance.forEach((word) => {
            currentSentanceContainer.append(word.render());
        });
      }
    }

    randomInteger(min, max) {
        const rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    check() {
        document.querySelector('.check-container').addEventListener('click', () => {
            this.render('check');
            // console.log(this.pazzle[this.currentSentenceIndex][0]);
            if (!this.pazzle[this.currentSentenceIndex].find((el) => el.correct === false)) {
                document.querySelector('.puzzle-container__buttons-container').innerHTML = templates.buttonContinue;
                this.continue();
            } 
        })
    }

    dontKnow() {
        if (document.querySelector('.dont-know-container')) {
            document.querySelector('.dont-know-container').addEventListener('click', () => {
                this.render('dont know');
            })
        }
    }

    continue() {
        document.querySelector('.continue-container').addEventListener('click', () => {
            if (store.round === 29 && this.round.length === 0) {
                alert('new LVL');
                store.round = 0;
                store.level += 1;
                createNewRound(store.level, store.round);
            } else if (this.round.length === 0) {
                    store.round += 1;
                    createNewRound(store.level, store.round);
            } else {
                this.currentSentance = this.round.pop();
                this.render();
            }
        })
    }
  }

  export default Pazzle;