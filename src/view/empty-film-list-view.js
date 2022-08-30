import AbstractView from '../framework/view/abstract-view.js';

const createNewEmptyFilmList = () => `
  <section class="films-list">
    <h2 class="films-list__title">There are no movies in our database</h2>
  </section>`;

export default class NewEmptyFilmListView extends AbstractView {

  get template() {
    return createNewEmptyFilmList();
  }
}
