/* eslint-disable no-unused-expressions */
import paintings1 from './paintings/level1';
import paintings2 from './paintings/level2';
import paintings3 from './paintings/level3';
import paintings4 from './paintings/level4';
import paintings5 from './paintings/level5';
import paintings6 from './paintings/level6';
import store from './store';


class Part {
    constructor(parent, sentance, pos, content, isLast, wordCount) {
      this.target = [sentance, pos];
      this.isLast = isLast;
      this.targetCurr = [];
      this.correct = false;
      this.inPazzle = false;
      this.content = content;
      this.parent = parent;
      this.wordCount = wordCount;
    }
  
    putToPazzle(sentance, pos) {
        this.inPazzle = true;
        this.parent.putToPazzle(this);
        this.targetCurr = [sentance, pos];
        this.check();
    }
  
    check() {
      this.correct = this.target.join("") === this.targetCurr.join("");
    }
  
    render(argument) {
      const maskStart = document.createElement("div");
      maskStart.classList.add("mask");
      const maskEnd = document.createElement("div");
      maskEnd.classList.add("mask");
      const wordContainer = document.createElement("div");
      wordContainer.classList.add("word-container");

      wordContainer.style = `width: ${900 / this.wordCount}px; 
      background-image: url("https://raw.githubusercontent.com/alpolesh/rslang_data_paintings/master/${paintings1[store.round].cutSrc}"); 
      background-position: top -${(9 - this.target[0]) * 43}px left -${900 / this.wordCount * (this.target[1])}px;`;
      
      const word = document.createElement("span");
      word.classList.add("word");
      word.innerHTML = this.content;
      // console.log(word);
      if (argument === 'check') {
          if (this.correct) wordContainer.classList.add('word-container_check-right')
          else wordContainer.classList.add('word-container_check-false')
      }
      wordContainer.append(maskStart);
      wordContainer.append(word);
      wordContainer.append(maskEnd);

      if (argument === 'dont know') this.putToPazzle.bind(this)(this.target[0], this.parent.pazzle[10 - this.target[0] - 1].length);
  
      !this.inPazzle &&
        wordContainer.addEventListener("click", (e) => {
        //   console.log(e.target.closest('.word-container').offsetWidth)
          this.putToPazzle.bind(this)(this.target[0], this.parent.pazzle[10 - this.target[0] - 1].length);
        });
  
      return wordContainer;
    }
  }

  export default Part;