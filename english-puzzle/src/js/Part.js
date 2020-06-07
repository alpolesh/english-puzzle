

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
      this.inPazzle = true;
      this.parent.putToPazzle(this);
      this.targetCurr = [this.target[0], this.parent.pazzle[10 - this.target[0] - 1].length - 1];
      this.check();
      
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
  
      if (this.target[1] === 0)
        wordContainer.style =
          `clip-path: polygon(calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 0 0); width: ${900 / this.parent.countWord}px;`;
      else if (this.isLast)
        wordContainer.style =
          `clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 100%, 20px 50%, 0 0); width: ${900 / this.parent.countWord}px;`;
      else
        wordContainer.style =
          `clip-path: polygon(calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%, 0 0); width: ${900 / this.parent.countWord}px;`;
      wordContainer.append(maskStart);
      wordContainer.append(word);
      wordContainer.append(maskEnd);
  
      !this.inPazzle &&
        wordContainer.addEventListener("click", (e) => {
        //   console.log(e.target.closest('.word-container').offsetWidth)
          this.putToPazzle.bind(this)();
        });
  
      return wordContainer;
    }
  }

  export default Part;