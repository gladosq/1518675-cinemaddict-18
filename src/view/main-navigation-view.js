import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../mock/const.js';

const createNewMainNavigation = (filter, currentFilterType) => {
  // const {type, name, count} = filter;

  return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item ${currentFilterType === 'all' ? 'main-navigation__item--active' : ''}" data-filter-type="${FilterType.ALL}">All movies</a>
    <a href="#watchlist" class="main-navigation__item ${currentFilterType === 'watchlist' ? 'main-navigation__item--active' : ''}" data-filter-type="${FilterType.WATCHLIST}">Watchlist <span class="main-navigation__item-count">${filter[1].count}</span></a>
    <a href="#history" class="main-navigation__item ${currentFilterType === 'history' ? 'main-navigation__item--active' : ''}" data-filter-type="${FilterType.HISTORY}">History <span class="main-navigation__item-count">${filter[2].count}</span></a>
    <a href="#favorites" class="main-navigation__item ${currentFilterType === 'favorites' ? 'main-navigation__item--active' : ''}" data-filter-type="${FilterType.FAVORITES}">Favorites <span class="main-navigation__item-count">${filter[3].count}</span></a>
  </nav>`
};

export default class NewMainNavigationView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();

    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template () {
    return createNewMainNavigation(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A' || evt.target.classList.contains('sort__button--active')) {
      return;
    }

    console.log(evt.target.dataset.filterType)

    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  };
}
