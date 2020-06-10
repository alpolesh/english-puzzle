/* eslint-disable max-classes-per-file */
import "../css/style.css";
import "../css/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import createNewRound from "./createNewRound";

createNewRound(store.level, store.round);





