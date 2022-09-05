import {generateFilmInfo} from '../mock/film.js';

export default class FilmsModel {
  #films = Array.from({length: 17}, generateFilmInfo);

  get films() {
    return this.#films;
  }
}
