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

import {checkNotEsc} from '../utils.js';

export default class BoardPresenter {
  boardComponent = document.querySelector('.main');

  init = (boardContainer, filmsModel, commentsModel) => {
    this.boardContainer = boardContainer;

    /* --- Подключаем модель фильмов --- */
    this.filmsModel = filmsModel;
    this.boardFilms = [...this.filmsModel.films];

    render(new NewSortFilterView(), boardContainer);
    render(new NewFilmListView(), boardContainer);

    /* --- Рендерим карточки фильмов в контейнер --- */
    const filmList = document.querySelector('.films-list__container');

    for (let i = 0; i < this.boardFilms.length; i++) {
      this.#renderFilm(this.boardFilms[i]);
    }

    render(new NewShowMoreButtonView(), filmList);

    /* --- Подключаем модель комментариев --- */
    this.commentsModel = commentsModel;
  };

  #renderFilm = (film) => {
    const filmComponent = new NewFilmCardView(film);
    const filmList = document.querySelector('.films-list__container');

    const footer = document.querySelector('.footer');

    const renderComments = () => {
      const filmCommentsList = document.querySelector('.film-details__comments-list');
      for (let i = 0; i < this.filmComments.length; i++) {

        render(new NewSingleCommentView(this.filmComments[i]), filmCommentsList);
      }
    };

    const hidePopup = () => {
      document.querySelector('.film-details').remove();
      document.body.classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (checkNotEsc) {
        evt.preventDefault();

        hidePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const showPopup = () => {
      render(new NewPopupWrapperView(), footer, RenderPosition.AFTEREND);
      const popupInnerWrapper = document.querySelector('.film-details__inner');
      render(new NewPopupTopContainerView(film['filmInfo']), popupInnerWrapper);
      render(new NewPopupBottomContainerView(film['comments']), popupInnerWrapper);

      document.body.classList.add('hide-overflow');
    };

    filmComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      showPopup();
      renderComments();

      document.addEventListener('keydown', onEscKeyDown);

      document.querySelector('.film-details__close-btn').addEventListener('click', () => {
        document.removeEventListener('keydown', onEscKeyDown);
        hidePopup();
      });
    });

    render(filmComponent, filmList);

    this.filmComments = generateComments(film['comments']);
  };
}
