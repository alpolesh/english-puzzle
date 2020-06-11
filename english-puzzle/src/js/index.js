/* eslint-disable max-classes-per-file */
import "../css/style.css";
import "../css/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import createNewRound from "./createNewRound";
import paintings1 from "./paintings/level1";

createNewRound(store.level, store.round);

// document.querySelector('.puzzle-container__results').style = `background-image: url("./img/${paintings1[0].imageSrc}");`



