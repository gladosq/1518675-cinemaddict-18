import AbstractView from '../framework/view/abstract-view.js';
import {SORT_TYPES} from '../mock/const.js';
import {sortTypeChange} from '../utils.js';

const createNewSortFilter = (currentSortType) => `
  <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SORT_TYPES.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SORT_TYPES.BY_DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SORT_TYPES.BY_RATING}">Sort by rating</a></li>
  </ul>`;

export default class NewSortFilterView extends AbstractView {
  #currentSortFilter = null;

  constructor(currentSortFilter) {
    super();

    this.#currentSortFilter = currentSortFilter;

  }

  get template() {
    return createNewSortFilter(this.#currentSortFilter);
  }

  setClickHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    console.log(evt.target.dataset.sortType);

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
