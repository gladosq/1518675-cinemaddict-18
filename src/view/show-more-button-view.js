import {createElement} from '../render.js';

const createNewShowMoreButton = () => `
  <button class="films-list__show-more">Show more</button>`;

export default class NewShowMoreButtonView {
  #element = null;

  get template() {
    return createNewShowMoreButton();
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
