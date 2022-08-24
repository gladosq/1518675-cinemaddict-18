import NewSortFilterView from '../view/new-sort-filter-view.js';
import NewFilmListView from '../view/film-list-view.js';
import NewShowMoreButtonView from '../view/show-more-button-view.js';

import {render} from '../render.js';

import FilmPresenter from '../presenter/film-presenter.js';

export default class BoardPresenter {
  boardComponent = document.querySelector('.main');

  init = (boardContainer, filmsModel) => {
    this.boardContainer = boardContainer;

    const filmPresenter = new FilmPresenter(this.boardContainer);

    this.filmsModel = filmsModel;
    this.boardFilms = [...this.filmsModel.films];

    render(new NewSortFilterView(), boardContainer);
    render(new NewFilmListView(), boardContainer);

    const filmList = document.querySelector('.films-list__container');

    for (let i = 0; i < this.boardFilms.length; i++) {
      filmPresenter.init(this.boardFilms[i]);
    }

    render(new NewShowMoreButtonView(), filmList);
  };
}
