import AbstractView from '../framework/view/abstract-view.js';

const createNewPopupWrapper = () => `
  <section class="film-details">
    <div class="film-details__inner"></div>
  </section>`;

export default class NewPopupWrapperView extends AbstractView {

  get template() {
    return createNewPopupWrapper();
  }
}
