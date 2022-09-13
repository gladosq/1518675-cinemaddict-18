import AbstractView from '../framework/view/abstract-view.js';
import {SORT_TYPES} from '../mock/const.js';

const createNewSortFilter = (currentSortType) =>
  `<ul class="sort">
    <li><a href="#" class="sort__button ${currentSortType === SORT_TYPES.DEFAULT ? 'sort__button--active' : ''}" data-sort-type="${SORT_TYPES.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SORT_TYPES.BY_DATE ? 'sort__button--active' : ''}" data-sort-type="${SORT_TYPES.BY_DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SORT_TYPES.BY_RATING ? 'sort__button--active' : ''}" data-sort-type="${SORT_TYPES.BY_RATING}">Sort by rating</a></li>
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
    if (evt.target.tagName !== 'A' || evt.target.classList.contains('sort__button--active')) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
