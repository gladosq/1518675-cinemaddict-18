import {createElement} from '../render.js';

const createNewFilmList = () => `
  <div class="films-list__container"></div>`;

export default class NewFilmListView {
  #element = null;

  get template() {
    return createNewFilmList();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
