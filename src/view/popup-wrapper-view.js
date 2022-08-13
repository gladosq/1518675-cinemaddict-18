import {createElement} from '../render.js';

const createNewPopupWrapper = () => `
  <section class="film-details">
    <div class="film-details__inner"></div>
  </section>`;

export default class NewPopupWrapperView {
  getTemplate() {
    return createNewPopupWrapper();
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
