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

    const showPopup = () => {
      render(new NewPopupWrapperView(), footer, RenderPosition.AFTEREND);
      const popupInnerWrapper = document.querySelector('.film-details__inner');
      render(new NewPopupTopContainerView(films[0]['filmInfo']), popupInnerWrapper);
      render(new NewPopupBottomContainerView(), popupInnerWrapper);

      document.body.classList.add('hide-overflow');
    }

    const hidePopup = () => {
      document.querySelector('.film-details').remove();
      document.body.classList.remove('hide-overflow');
    }

    const onEscKeyDown = (evt) => {

      if (checkNotEsc) {
        evt.preventDefault();

        hidePopup();

        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    /* --- Обработчики на открытие и закрытие попапа --- */
    const filmCardLinks = this.boardContainer.querySelectorAll('.film-card__link');
    const filmDetailsCloseButton = this.boardContainer.querySelector('.film-details__close-btn');


    const films = this.boardFilms;

    filmCardLinks.forEach((item) => {
      item.addEventListener('click', () => {

        showPopup();

        document.addEventListener('keydown', onEscKeyDown);
        console.log(document.querySelector('.film-details__close-btn'));
        document.querySelector('.film-details__close-btn').addEventListener('click', (evt) => {
          console.log(evt.target);
          document.removeEventListener('keydown', onEscKeyDown);
          hidePopup();
        });
      })
    })

    // const popupInnerWrapper = document.querySelector('.film-details__inner');

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
