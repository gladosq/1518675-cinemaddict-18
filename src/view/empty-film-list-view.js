import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../mock/const.js';

const NoFilmsTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no films in your watchlist',
  [FilterType.HISTORY]: 'There are no films in your history',
  [FilterType.FAVORITES]: 'There are no films in your favorites'
};

const createNewEmptyFilmList = (filterType) => {
  const noFilmTextValue = NoFilmsTextType[filterType];

  return (
    `<section class="films-list">
      <h2 class="films-list__title">${noFilmTextValue}</h2>
    </section>`
  );
};

export default class NewEmptyFilmListView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNewEmptyFilmList(this.#filterType);
  }
}
