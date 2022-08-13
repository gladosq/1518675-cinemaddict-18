import {createElement} from '../render.js';

const createNewFilmList = () => `
  <div class="films-list__container"></div>`;

export default class NewFilmListView {
  getTemplate() {
    return createNewFilmList();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
