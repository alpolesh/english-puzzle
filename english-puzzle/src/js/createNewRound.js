import getWords from './API/getWords';
import Pazzle from './Pazzle';

function createNewRound(level, round) {
    getWords(level, round).then((sentences) => {
        const pazzle = new Pazzle(sentences);
        pazzle.render();
    });
}

export default createNewRound;