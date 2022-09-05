import NewSortFilterView from '../view/new-sort-filter-view.js';
import NewFilmListView from '../view/film-list-view.js';
import NewShowMoreButtonView from '../view/show-more-button-view.js';
import NewEmptyFilmListView from '../view/empty-film-list-view.js';

import {RenderPosition} from '../render.js';
import {render} from '../framework/render.js';

import {sortTypeChange} from '../utils.js';

import FilmPresenter from '../presenter/film-presenter.js';

const FILM_COUNT_PER_STEP = 5;

export default class BoardPresenter {
  #boardContainer = null;
  #filmsModel = null;

  constructor (boardContainer, filmsModel) {
    this.boardContainer = boardContainer;
    this.filmsModel = filmsModel;
  }

  #boardFilms = [];
  #defaultFilms = [];

  #renderedFilmCount = FILM_COUNT_PER_STEP;

  #loadMoreButtonComponent = new NewShowMoreButtonView();


  init = (boardContainer, filmsModel) => {
    this.boardContainer = boardContainer;

    this.filmsModel = filmsModel;

    this.#boardFilms = [...this.filmsModel.films];
    this.#defaultFilms = this.#boardFilms.slice();

    this.#renderBoard();
  };

  #loadMoreHandlerClick = () => {
    const filmPresenter = new FilmPresenter(this.boardContainer);

    this.#boardFilms
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((item) => {
        filmPresenter.init(item);
      });

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#boardFilms.length) {
      this.#loadMoreButtonComponent.element.remove();
      this.#loadMoreButtonComponent.removeElement();
    }
  };

  #renderBoard = () => {
    const filmPresenter = new FilmPresenter(this.boardContainer);

    if (this.#boardFilms.length < 1) {
      this.#renderNoFilms();
      return;
    }

    const sortFilterComponent = new NewSortFilterView('default');
    render(sortFilterComponent, this.boardContainer);

    render(new NewFilmListView(), this.boardContainer);

    const filmList = document.querySelector('.films-list__container');

    for (let i = 0; i < Math.min(this.#boardFilms.length, FILM_COUNT_PER_STEP); i++) {
      filmPresenter.init(this.#boardFilms[i]);
    }

    if (this.#boardFilms.length > FILM_COUNT_PER_STEP) {
      render(this.#loadMoreButtonComponent, filmList, RenderPosition.AFTEREND);
      this.#loadMoreButtonComponent.setClickHandler(this.#loadMoreHandlerClick);
    }

    sortFilterComponent.setClickHandler(this.#sortFilms);
  };

  #renderNoFilms = () => {
    render(new NewEmptyFilmListView, this.boardContainer);
  };

  #sortFilms = (sortType) => {

    const filmPresenter = new FilmPresenter(this.boardContainer);
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;

    document.querySelector('.sort').remove();

    const sortFilterComponent = new NewSortFilterView(sortType);
    render(sortFilterComponent, this.boardContainer, RenderPosition.BEFOREBEGIN);

    const changeNewFilter = sortTypeChange(sortType);

    let filteredFilms = [];
    if (changeNewFilter !== -1) {
      filteredFilms = changeNewFilter(this.#boardFilms);
    } else {
      filteredFilms = this.#defaultFilms;
    }

    this.#clearAllFilms();

    for (let i = 0; i < Math.min(filteredFilms.length, FILM_COUNT_PER_STEP); i++) {
      filmPresenter.init(filteredFilms[i]);
    }
    const filmList = document.querySelector('.films-list__container');

    if (filteredFilms.length > FILM_COUNT_PER_STEP) {
      render(this.#loadMoreButtonComponent, filmList, RenderPosition.AFTEREND);
      this.#loadMoreButtonComponent.setClickHandler(this.#loadMoreHandlerClick);
    }

    sortFilterComponent.setClickHandler(this.#sortFilms);
  };

  #clearAllFilms = () => {
    const filmList = this.boardContainer.querySelector('.films-list__container');

    while (filmList.firstChild) {
      filmList.firstChild.remove();
    }
  };

  #updateFilmInfo = () => {

  };
}
