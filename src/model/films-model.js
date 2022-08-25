import {generateFilmInfo} from '../mock/film.js';

export default class FilmsModel {
  #films = Array.from({length: 22}, generateFilmInfo);

  get films() {
    return this.#films;
  }
}
