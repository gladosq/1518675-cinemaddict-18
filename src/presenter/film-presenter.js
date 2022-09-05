import NewSingleCommentView from '../view/popup-single-comment-view.js';
import NewPopupWrapperView from '../view/popup-wrapper-view.js';
import NewPopupTopContainerView from '../view/popup-top-container-view.js';
import NewPopupBottomContainerView from '../view/popup-bottom-container-view.js';
import NewFilmCardView from '../view/film-card-view.js';
import NewShowMoreButtonView from '../view/show-more-button-view.js';

import {generateComments} from '../mock/comment.js';
import {RenderPosition} from '../render.js';
import {render} from '../framework/render.js';

import {checkNotEsc} from '../utils.js';

export default class FilmPresenter {
  #boardContainer = null;
  #film = null;

  constructor(boardContainer) {
    this.#boardContainer = boardContainer;
  }

  init = (film) => {

    this.#film = film;

    const filmComponent = new NewFilmCardView(film);

    filmComponent.setClickHandler(this.#showPopupClickHandler);

    const filmList = document.querySelector('.films-list__container');
    render(filmComponent, filmList);
  };

  #renderComments = (comments) => {
    const filmCommentsList = document.querySelector('.film-details__comments-list');
    for (let i = 0; i < comments.length; i++) {
      render(new NewSingleCommentView(comments[i]), filmCommentsList);
    }
  }

  #hidePopup = () => {
    document.querySelector('.film-details').remove();
    document.body.classList.remove('hide-overflow');
  };

  #onEscKeyDown = (evt) => {
    if (checkNotEsc) {
      evt.preventDefault();

      this.#hidePopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #showPopup = (film) => {

    const footer = document.querySelector('.footer');

    render(new NewPopupWrapperView(), footer, RenderPosition.AFTEREND);
    const popupInnerWrapper = document.querySelector('.film-details__inner');
    render(new NewPopupTopContainerView(film['filmInfo']), popupInnerWrapper);
    render(new NewPopupBottomContainerView(film['comments']), popupInnerWrapper);

    document.body.classList.add('hide-overflow');
  };

  #showPopupClickHandler = (film) => {
    console.log(film);
    this.#showPopup(this.#film);


    /* --- Генерирум комментарии по айдишникам --- */
    const comments = generateComments(this.#film['comments']);

    /* --- Рендерим комментарии во view --- */
    this.#renderComments(comments);

    document.addEventListener('keydown', this.#onEscKeyDown);

    const loadMoreButtonComponent = new NewShowMoreButtonView();

    loadMoreButtonComponent.setClickHandler(() => {
      document.removeEventListener('keydown', this.#onEscKeyDown);
      this.#hidePopup();
    });
  };

  // #clickWatchListHandler = () => {

  // }

  // #clickAlreadyWatchedHandler = () => {

  // }

  // #clickAddFavoritesHandler = () => {

  // }
}
