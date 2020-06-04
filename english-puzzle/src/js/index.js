import '../css/style.css';
import '../css/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import getWords from './API/getWords';
import store from './store';

async function addNewSentence(i) {
  

  const roundSentences = await getWords(store.level, store.round);
  const currentSentence = roundSentences[i].textExample;
  
  const arr = currentSentence.split(' ');
  
  arr.forEach(element => {
    const word = document.createElement('span');
    word.classList.add('word');
    word.innerHTML = element;
    console.log(word)
    document.querySelector('.puzzle-container__workspace').append(word);
  });
  
  
}

addNewSentence(0)

