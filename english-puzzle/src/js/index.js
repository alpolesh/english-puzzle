/* eslint-disable max-classes-per-file */
import "../css/style.css";
import "../css/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import getWords from "./API/getWords";
import store from "./store";
import Pazzle from "./Pazzle";






getWords(store.level, store.round).then((sentences) => {
  const pazzle = new Pazzle(sentences);
  pazzle.render();
});
