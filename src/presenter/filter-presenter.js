import {render, replace, remove} from '../framework/render.js';
import NewMainNavigationView from '../view/main-navigation-view.js';
import {filter} from '../utils/filter.js';
import {FilterType, UpdateType} from '../mock/const.js';
import {RenderPosition} from '../render.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #filmsModel = null;

  #filterComponent = null;

  constructor(filterContainer, filmsModel, filterModel) {
    this.#filterContainer = filterContainer;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  get filters() {
    const films = this.#filmsModel.films;
    // return 'pepega';

    return [
      {
        type: FilterType.ALL,
        name: 'All',
        count: 20
      },
      {
        type: FilterType.WATCHLIST,
        name: 'WATCHLIST',
        count: 14
      },
      {
        type: FilterType.HISTORY,
        name: 'HISTORY',
        count: 2
        // count: filter[FilterType.HISTORY](films).length
      },
      {
        type: FilterType.FAVORITES,
        name: 'FAVORITES',
        count: 10
        // count: filter[FilterType.FAVORITES](tasks).length
      }
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new NewMainNavigationView(filters, this.#filterModel.filter);

    this.#filterComponent.setFilterTypeChangeHandler(this.#filterTypeChangeHandler);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer, RenderPosition.BEFOREBEGIN);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #modelEventHandler = () => {
    this.init();
  };

  #filterTypeChangeHandler = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
