import '../css/style.css';
import '../css/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import getWords from './API/getWords';
import store from './store';

async function addNewSentence(i) {
  const roundSentences = await getWords(store.level, store.round);
  const currentSentence = roundSentences[i].textExample;
  
  const arr = currentSentence.split(' ');

  const resultSentence = document.createElement('div');
  resultSentence.classList.add('result-sentence');
  document.querySelector('.puzzle-container__results').append(resultSentence);
  
  arr.forEach((element, index) => {
    const maskStart = document.createElement('div');
    maskStart.classList.add('mask');
    const maskEnd = document.createElement('div');
    maskEnd.classList.add('mask');
    const wordContainer = document.createElement('div');
    wordContainer.classList.add('word-container');
    const word = document.createElement('span');
    word.classList.add('word');
    word.innerHTML = element;
    console.log(word);
    if (index === 0) wordContainer.style = "clip-path: polygon(calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 0 0);"
    else if (index === arr.length-1) wordContainer.style = "clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 100%, 20px 50%, 0 0);"
    else wordContainer.style = "clip-path: polygon(calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%, 0 0);"
    
    wordContainer.append(maskStart);
    wordContainer.append(word);
    wordContainer.append(maskEnd);
    document.querySelector('.puzzle-container__workspace').append(wordContainer);
    
    wordContainer.addEventListener('click', (e) => {
      resultSentence.append(wordContainer);
    })
  });
  
}

addNewSentence(0)

