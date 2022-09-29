import NewSortFilterView from '../view/new-sort-filter-view.js';
import NewFilmListView from '../view/film-list-view.js';
import NewShowMoreButtonView from '../view/show-more-button-view.js';
import NewEmptyFilmListView from '../view/empty-film-list-view.js';
import NewMainNavigationView from '../view/main-navigation-view.js';

import {RenderPosition} from '../render.js';
import {render, remove} from '../framework/render.js';
import {sortTypeChange, sortByDate, sortByRating} from '../utils/utils.js';
import {SortType, UpdateType, UserAction, FilterType} from '../mock/const.js';

import {filter} from '../utils/filter.js';

import FilmPresenter from '../presenter/film-presenter.js';

const FILM_COUNT_PER_STEP = 5;

export default class BoardPresenter {

  #boardContainer = null;
  #filmsModel = null;
  #filterModel = null;
  #noFilmsComponent = null;

  // #mainNavigationComponent = new NewMainNavigationView();
  #filmListComponent = new NewFilmListView();
  #sortFilmComponent = new NewSortFilterView('default');
  // #noFilmsComponent = new NewEmptyFilmListView();
  #loadMoreButtonComponent = new NewShowMoreButtonView();

  #filterType = FilterType.ALL;

  #currentSortType = SortType.DEFAULT;

  // #boardFilms = [];
  #defaultFilms = [];
  #filteredFilms = [];

  /* --- Коллекция Map с id презентеров --- */

  #filmsPresenterCollection = new Map();

  #renderedFilmCount = FILM_COUNT_PER_STEP;

  constructor (boardContainer, filmsModel, filterModel) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;

    console.log(this.#filmsModel);

    // this.#taskNewPresenter = new TaskNewPresenter(this.#taskListComponent.element, this.#viewActionHandler);

    this.#filmsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  get films() {

    this.#filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    console.log(films);

    const filteredFilms = filter[this.#filterType](films);
    console.log(filteredFilms);

    switch (this.#currentSortType) {
      case SortType.BY_DATE:
        return filteredFilms.sort(sortByDate);
      case SortType.BY_RATING:
        return filteredFilms.sort(sortByRating);
    }

    return filteredFilms;

    // const changeNewFilter = sortTypeChange(this.#currentSortType);
    // return films = (changeNewFilter) ? changeNewFilter(films) : this.#defaultFilms.slice();

    // return this.#filmModel.film;
  }

  #viewActionHandler = (actionType, updateType, update) => {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.SORT:
        this.#filmsModel.updateFilm(updateType, update);
      case UserAction.FILTER:
        this.#filmsModel.updateFilm(updateType, update);
      break;
      // case UserAction.ADD_TASK:
      // this.#filmsModel.addTask(updateType, update);
      // break;
      // case UserAction.DELETE_TASK:
      // this.#filmsModel.deleteTask(updateType, update);
      // break;
    }
  };

  #modelEventHandler = (updateType, data) => {
    console.log(UpdateType);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)

    switch (updateType) {
      case UpdateType.PATCH:
      console.log('work');
        this.#filmsPresenterCollection.get(film.id).init(updatedFilm);
      break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
      break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetRenderedFilmCount: true, resetSortType: true });
        this.#renderBoard();
      break;
    }
  };

  init = () => {
    // this.#boardFilms = [...this.#filmsModel.films];
    // this.#defaultFilms = this.#boardFilms.slice();
    this.#renderBoard();
  };

  #clearBoard = ({resetRenderedTaskCount = false, resetSortType = false} = {}) => {
    const filmCount = this.films.length;

    this.#filmsPresenterCollection.forEach((item) => {
      item.destroy();
    });

    // this.#filmPresenter.forEach((presenter) => presenter.destroy());
    // this.#filmPresenter.clear();

    this.#filmsPresenterCollection.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;

    remove(this.#loadMoreButtonComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #loadMoreButtonClickHandler = () => {
    // this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);
    // this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    const filmCount = this.films.length;

    const newRenderedFilmCount = Math.min(filmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);

    const films = this.films.slice(this.#renderedFilmCount, newRenderedFilmCount);

    this.#renderFilms(films);
    this.#renderedFilmCount = newRenderedFilmCount;

    if (this.#renderedFilmCount >= filmCount) {
      remove(this.#loadMoreButtonComponent);
    }
  };

  /* --- Рендер блока сортировки --- */

  #renderSort = () => {
    this.#sortFilmComponent = new NewSortFilterView(this.#currentSortType);
    // new NewSortFilterView(sortType);
    // render(this.#sortFilmComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
    this.#sortFilmComponent.setClickHandler(this.#sortTypeChangeHandler);

    render(this.#sortFilmComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);

    // if (this.#filteredFilms.length > FILM_COUNT_PER_STEP) {
    //   render(this.#loadMoreButtonComponent, this.#filmListComponent, RenderPosition.AFTEREND);
    //   this.#loadMoreButtonComponent.setClickHandler(this.#loadMoreButtonClickHandler);
    // }
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmListComponent.element, this.#filmChangeHandler, this.#checkSinglePopupHandler);
    filmPresenter.init(film);
    this.#filmsPresenterCollection.set(film.id, filmPresenter);
  };

  // #renderFilms = (from, to) => {
  //   this.#boardFilms
  //   .slice(from, to)
  //   .forEach((item) => this.#renderFilm(item));
  // };

  #renderFilms = (films) => {
    this.films.forEach((film) => this.#renderFilm(film));

    // this.#boardFilms
    //   .slice(from, to)
    //   .forEach((item) => this.#renderFilm(item));
  };

  #renderNoFilms = () => {
    this.#noFilmsComponent = new NewEmptyFilmListView(this.#filterType);
    render(this.#noFilmsComponent, this.#boardContainer);
  };

  #renderFilmList = () => {
    const filmCount = this.films.length;
    const tasks = this.films.slice(0, Math.min(filmCount, FILM_COUNT_PER_STEP));

    render(this.#filmListComponent, this.#boardContainer);

    this.#renderFilms(this.films);

    // this.#renderFilms(0, Math.min(this.#boardFilms.length, FILM_COUNT_PER_STEP));

    if (filmCount > FILM_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  };

  #renderBoard = () => {
    // this.#renderMainNavigation();

    const films = this.films;
    const filmCount = films.length;

    if (filmCount < 1) {
      this.#renderNoFilms();
      return;
    }

    this.#renderSort();
    // this.#renderFilmList();

    render(this.#filmListComponent, this.#boardContainer);

    this.#renderFilms(films.slice(0, Math.min(filmCount, this.#renderedFilmCount)));

    if (filmCount > this.#renderedFilmCount) {
      this.#renderLoadMoreButton();
    }
  };

  // #renderMainNavigation = () => {
  //   render(this.#mainNavigationComponent, this.#boardContainer, RenderPosition.BEFOREBEGIN);
  // };

  #renderLoadMoreButton = () => {
    render(this.#loadMoreButtonComponent, this.#boardContainer);

    this.#loadMoreButtonComponent.setClickHandler(this.#loadMoreButtonClickHandler);
  };

  // #clearFilmList = () => {

  //   /* --- Удаляем презентеры из коллекции Map --- */

  //   this.#filmsPresenterCollection.forEach((item) => {
  //     item.destroy();
  //   });

  //   this.#filmsPresenterCollection.clear();
  //   this.#renderedFilmCount = FILM_COUNT_PER_STEP;

  //   remove(this.#loadMoreButtonComponent);
  // };

  #sortTypeChangeHandler = (sortType) => {

    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedFilmCount: true});
    this.#renderBoard();


    // const changeNewFilter = sortTypeChange(sortType);

    // this.#boardFilms = (changeNewFilter) ? changeNewFilter(this.#boardFilms) : this.#defaultFilms.slice();

    /* --- Перерисовываем сортировку с актуальным фильтром --- */

    // document.querySelector('.sort').remove();
    // const sortFilmComponent = new NewSortFilterView(sortType);
    // render(sortFilmComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
    // sortFilmComponent.setClickHandler(this.#sortTypeChangeHandler);

    // this.#clearFilmList();
    // this.#renderFilms(0, Math.min(this.films.length, FILM_COUNT_PER_STEP));
    // this.#renderLoadMoreButton();
  };

  #filmChangeHandler = (updatedFilm) => {
    this.#filmsModel.updateFilm(this.films, updatedFilm);

    /* --- Ререндер списка фильмов после смены состояния в попапе --- */

    // this.#clearFilmList();
    // this.#renderFilms(0, Math.min(this.#boardFilms.length, FILM_COUNT_PER_STEP));
    // this.#renderLoadMoreButton();

    this.#filmsPresenterCollection.get(updatedFilm.id).init(updatedFilm);
  };

  #checkSinglePopupHandler = () => {
    if (document.querySelector('.film-details')) {
      return true;
    }
  };
}
