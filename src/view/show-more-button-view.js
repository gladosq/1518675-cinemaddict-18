import {createElement} from '../render.js';

const createNewShowMoreButton = () => `
  <button class="films-list__show-more">Show more</button>`;

export default class NewShowMoreButtonView {
  getTemplate() {
    return createNewShowMoreButton();
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
