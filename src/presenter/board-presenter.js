import NewSortFilterView from '../view/new-sort-filter-view.js';
import NewFilmListView from '../view/film-list-view.js';
import NewFilmCardView from '../view/film-card-view.js';
import NewShowMoreButtonView from '../view/show-more-button-view.js';
import NewPopupWrapperView from '../view/popup-wrapper-view.js';
import NewPopupTopContainerView from '../view/popup-top-container-view.js';
import NewPopupBottomContainerView from '../view/popup-bottom-container-view.js';
import NewSingleCommentView from '../view/popup-single-comment-view.js';

import {generateComments} from '../mock/comment.js';

import {render, RenderPosition} from '../render.js';

export default class BoardPresenter {
  boardComponent = document.querySelector('.main');

  init = (boardContainer, filmsModel, commentsModel) => {
    this.boardContainer = boardContainer;

    /* --- Подключаем модель фильмов --- */
    this.filmsModel = filmsModel;
    this.boardFilms = [...this.filmsModel.getFilms()];

    render(new NewSortFilterView(), boardContainer);
    render(new NewFilmListView(), boardContainer);

    /* --- Рендерим карточки фильмов в контейнер --- */
    const filmList = document.querySelector('.films-list__container');
    for (let i = 0; i < this.boardFilms.length; i++) {
      render(new NewFilmCardView(this.boardFilms[i]), filmList);
    }

    render(new NewShowMoreButtonView(), filmList);

    const footer = document.querySelector('.footer');

    /* --- Рендерим попап --- */
    render(new NewPopupWrapperView(), footer, RenderPosition.AFTEREND);
    const popupInnerWrapper = document.querySelector('.film-details__inner');
    render(new NewPopupTopContainerView(this.boardFilms[0]['filmInfo']), popupInnerWrapper);
    render(new NewPopupBottomContainerView(), popupInnerWrapper);

    /* --- Подключаем модель комментариев --- */
    this.commentsModel = commentsModel;
    this.filmComments = generateComments(this.boardFilms[0]['comments']);

    /* --- Рендерим комментарии --- */
    const filmCommentsList = document.querySelector('.film-details__comments-list');
    for (let i = 0; i < this.filmComments.length; i++) {
      render(new NewSingleCommentView(this.filmComments[i]), filmCommentsList);
    }

  };
}
