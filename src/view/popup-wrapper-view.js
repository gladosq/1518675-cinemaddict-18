import {createElement} from '../render.js';

const createNewPopupWrapper = () => `
  <section class="film-details">
    <div class="film-details__inner"></div>
  </section>`;

export default class NewPopupWrapperView {
  #element = null;

  get template() {
    return createNewPopupWrapper();
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
