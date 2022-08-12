import {createElement} from '../render.js';

const createNewBoard = () => '<main class="main"></main>';

export default class NewBoardView {
  getTemplate() {
    return createNewBoard();
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
