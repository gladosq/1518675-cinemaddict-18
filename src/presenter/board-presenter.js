import NewSortFilterView from '../view/new-sort-filter-view.js';
import NewFilmListView from '../view/film-list-view.js';
import NewShowMoreButtonView from '../view/show-more-button-view.js';
import NewEmptyFilmList from '../view/empty-film-list-view.js';

import {render, RenderPosition} from '../render.js';

import FilmPresenter from '../presenter/film-presenter.js';

const FILM_COUNT_PER_STEP = 5;

export default class BoardPresenter {
  boardComponent = document.querySelector('.main');

  #loadMoreButtonComponent = new NewShowMoreButtonView();
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  constructor (boardContainer, filmsModel) {
    this.boardContainer = boardContainer;
    this.filmsModel = filmsModel;
  }

  init = (boardContainer, filmsModel) => {
    this.boardContainer = boardContainer;

    this.filmsModel = filmsModel;
    this.boardFilms = [...this.filmsModel.films];

    this.#renderBoard();


  };

  #loadMoreHandlerClick = (evt) => {
    evt.preventDefault();

    const filmPresenter = new FilmPresenter(this.boardContainer);

    this.boardFilms
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((item) => {
        filmPresenter.init(item);
      });


    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.boardFilms.length) {
      this.#loadMoreButtonComponent.element.remove();
      this.#loadMoreButtonComponent.removeElement();
    }
  };

  #renderBoard = () => {
    const filmPresenter = new FilmPresenter(this.boardContainer);
    if (this.boardFilms.length < 1) {
      render(new NewEmptyFilmList, this.boardContainer);
    } else {
      render(new NewSortFilterView(), this.boardContainer);
      render(new NewFilmListView(), this.boardContainer);

      const filmList = document.querySelector('.films-list__container');

      for (let i = 0; i < Math.min(this.boardFilms.length, FILM_COUNT_PER_STEP); i++) {
        filmPresenter.init(this.boardFilms[i]);
      }

      if (this.boardFilms.length > FILM_COUNT_PER_STEP) {
        render(this.#loadMoreButtonComponent, filmList, RenderPosition.AFTEREND);
        this.#loadMoreButtonComponent.element.addEventListener('click', this.#loadMoreHandlerClick);
      }
    }
  };
}
