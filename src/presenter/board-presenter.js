import NewSortFilterView from '../view/new-sort-filter-view.js';
import NewFilmListView from '../view/film-list-view.js';
import NewShowMoreButtonView from '../view/show-more-button-view.js';
import NewEmptyFilmListView from '../view/empty-film-list-view.js';

import {RenderPosition} from '../render.js';
import {render, remove} from '../framework/render.js';

import {sortTypeChange, updateFilm} from '../utils.js';

import FilmPresenter from '../presenter/film-presenter.js';

const FILM_COUNT_PER_STEP = 5;

export default class BoardPresenter {

  #boardContainer = null;
  #filmsModel = null;

  #filmListComponent = new NewFilmListView();
  #sortFilmComponent = new NewSortFilterView('default');
  #noFilmsComponent = new NewEmptyFilmListView();
  #loadMoreButtonComponent = new NewShowMoreButtonView();

  #boardFilms = [];
  #defaultFilms = [];
  #filteredFilms = [];

  /* --- Коллекция Map с id презентеров --- */

  #filmsPresenterCollection = new Map();

  #renderedFilmCount = FILM_COUNT_PER_STEP;

  constructor (boardContainer, filmsModel) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    this.#boardFilms = [...this.#filmsModel.films];
    this.#defaultFilms = this.#boardFilms.slice();
    this.#renderBoard();
  };

  #loadMoreButtonClickHandler = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);
    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#boardFilms.length) {
      remove(this.#loadMoreButtonComponent);
    }
  };

  /* --- Рендер блока сортировки --- */

  #renderSort = () => {
    render(this.#sortFilmComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
    this.#sortFilmComponent.setClickHandler(this.#sortTypeChangeHandler);

    if (this.#filteredFilms.length > FILM_COUNT_PER_STEP) {
      render(this.#loadMoreButtonComponent, this.#filmListComponent, RenderPosition.AFTEREND);
      this.#loadMoreButtonComponent.setClickHandler(this.#loadMoreButtonClickHandler);
    }
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmListComponent.element, this.#filmChangeHandler, this.#checkSinglePopupHandler);
    filmPresenter.init(film);
    this.#filmsPresenterCollection.set(film.id, filmPresenter);
  };

  #renderFilms = (from, to) => {
    this.#boardFilms
      .slice(from, to)
      .forEach((item) => this.#renderFilm(item));
  };

  #renderNoFilms = () => {
    render(this.#noFilmsComponent, this.#boardContainer);
  };

  #renderFilmList = () => {
    render(this.#filmListComponent, this.#boardContainer);
    this.#renderFilms(0, Math.min(this.#boardFilms.length, FILM_COUNT_PER_STEP));

    if (this.#boardFilms.length > FILM_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  };

  #renderBoard = () => {
    if (this.#boardFilms.length < 1) {
      this.#renderNoFilms();
      return;
    }

    this.#renderSort();
    this.#renderFilmList();
  };

  #renderLoadMoreButton = () => {
    render(this.#loadMoreButtonComponent, this.#boardContainer);

    this.#loadMoreButtonComponent.setClickHandler(this.#loadMoreButtonClickHandler);
  };

  #clearFilmList = () => {

    /* --- Удаляем презентеры из коллекции Map --- */

    this.#filmsPresenterCollection.forEach((item) => {
      item.destroy();
    });

    this.#filmsPresenterCollection.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;

    remove(this.#loadMoreButtonComponent);
  };

  #sortTypeChangeHandler = (sortType) => {
    const changeNewFilter = sortTypeChange(sortType);

    if (changeNewFilter !== false) {
      this.#boardFilms = changeNewFilter(this.#boardFilms);
    } else {
      this.#boardFilms = this.#defaultFilms.slice();
    }

    /* --- Перерисовываем сортировку с актуальным фильтром --- */

    document.querySelector('.sort').remove();
    const sortFilmComponent = new NewSortFilterView(sortType);
    render(sortFilmComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
    sortFilmComponent.setClickHandler(this.#sortTypeChangeHandler);

    this.#clearFilmList();
    this.#renderFilms(0, Math.min(this.#boardFilms.length, FILM_COUNT_PER_STEP));
    this.#renderLoadMoreButton();
  };

  #filmChangeHandler = (updatedFilm) => {
    this.#boardFilms = updateFilm(this.#boardFilms, updatedFilm);
    this.#filmsPresenterCollection.get(updatedFilm.id).init(updatedFilm);
  };

  #checkSinglePopupHandler = () => {
    if (document.querySelector('.film-details')) {
      return true;
    }
  };
}
