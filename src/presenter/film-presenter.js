import NewSingleCommentView from '../view/popup-single-comment-view.js';
import NewPopupWrapperView from '../view/popup-wrapper-view.js';
import NewPopupTopContainerView from '../view/popup-top-container-view.js';
import NewPopupBottomContainerView from '../view/popup-bottom-container-view.js';
import NewFilmCardView from '../view/film-card-view.js';
// import NewShowMoreButtonView from '../view/show-more-button-view.js';

import {generateComments} from '../mock/comment.js';
import {RenderPosition} from '../render.js';
import {render, remove} from '../framework/render.js';

import {checkNotEsc} from '../utils.js';

export default class FilmPresenter {

  #filmListComponent = null;
  #changeFilm = null;
  #filmComponent = null;
  #film = null;
  #checkSinglePopup = null;

  constructor(filmListComponent, changeFilm, checkSinglePopup) {
    this.#filmListComponent = filmListComponent;
    this.#changeFilm = changeFilm;
    this.#checkSinglePopup = checkSinglePopup;
  }

  init = (film) => {

    this.#film = film;
    this.#filmComponent = new NewFilmCardView(film);

    /* --- Обработчик на открытие попапа --- */

    this.#filmComponent.setClickHandler(this.#showPopupClickHandler);

    /* --- Обработчики на изменение фильма --- */

    this.#filmComponent.setFavoriteClickHandler(this.#clickFavoriteHandler);
    this.#filmComponent.setAlreadyWatchedClickHandler(this.#clickAlreadyWatchedHandler);
    this.#filmComponent.setWatchLaterClickHandler(this.#clickWatchLaterHandler);

    render(this.#filmComponent, this.#filmListComponent.querySelector('.films-list__container'), RenderPosition.BEFOREEND);
  };

  #renderComments = (comments) => {
    const filmCommentsList = document.querySelector('.film-details__comments-list');
    for (let i = 0; i < comments.length; i++) {
      render(new NewSingleCommentView(comments[i]), filmCommentsList);
    }
  };

  #hidePopup = () => {
    document.querySelector('.film-details').remove();
    document.body.classList.remove('hide-overflow');
  };

  #onEscKeyDown = (evt) => {
    evt.preventDefault();

    if (!checkNotEsc(evt)) {
      this.#hidePopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #clickClosePopupButtonHandler = (evt) => {
    evt.preventDefault();

    this.#hidePopup();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #showPopup = () => {
    const footer = document.querySelector('.footer');

    render(new NewPopupWrapperView(), footer, RenderPosition.AFTEREND);
    const popupInnerWrapper = document.querySelector('.film-details__inner');

    const popupFilmButtonsComponent = new NewPopupTopContainerView(this.#film);

    /* --- Навешиваем обработчики на кнопки в попапе --- */

    popupFilmButtonsComponent.setFavoriteClickHandler(this.#clickFavoritePopupHandler);
    popupFilmButtonsComponent.setAlreadyWatchedClickHandler(this.#clickAlreadyWatchedPopupHandler);
    popupFilmButtonsComponent.setWatchLaterClickHandler(this.#clickWatchLaterPopupHandler);

    render(popupFilmButtonsComponent, popupInnerWrapper);
    render(new NewPopupBottomContainerView(this.#film['comments']), popupInnerWrapper);

    /* --- Обработчик на кнопку закрытия попапа --- */

    const closePopupButton = document.querySelector('.film-details__close-btn');
    closePopupButton.addEventListener('click', this.#clickClosePopupButtonHandler);

    document.body.classList.add('hide-overflow');
  };

  #showPopupClickHandler = (film) => {

    /* --- Проверка на уже открытый попап --- */

    if (this.#checkSinglePopup()) {
      this.#hidePopup();
    }

    this.#showPopup(film);

    /* --- Генерируем комментарии по айдишникам --- */

    const comments = generateComments(film.comments);

    /* --- Рендерим комментарии во view --- */

    this.#renderComments(comments);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  destroy = () => {
    remove(this.#filmComponent);
  };

  /* --- Обработчики на кнопки в карточке фильма --- */

  #clickFavoriteHandler = () => {
    const updatedFilm = this.#film;
    updatedFilm.userDetails.favorite = !this.#film.userDetails.favorite;
  };

  #clickAlreadyWatchedHandler = () => {
    const updatedFilm = this.#film;
    updatedFilm.userDetails.alreadyWatched = !this.#film.userDetails.alreadyWatched;
  };

  #clickWatchLaterHandler = () => {
    const updatedFilm = this.#film;
    updatedFilm.userDetails.watchlist = !this.#film.userDetails.watchlist;
  };

  /* --- Обработчики на кнопки в попапе --- */

  #clickFavoritePopupHandler = () => {
    const updatedFilm = this.#film;
    updatedFilm.userDetails.favorite = !this.#film.userDetails.favorite;
    this.#changeFilm(updatedFilm);
  };

  #clickAlreadyWatchedPopupHandler = () => {
    const updatedFilm = this.#film;
    updatedFilm.userDetails.alreadyWatched = !this.#film.userDetails.alreadyWatched;
    this.#changeFilm(updatedFilm);
  };

  #clickWatchLaterPopupHandler = () => {
    const updatedFilm = this.#film;
    updatedFilm.userDetails.watchlist = !this.#film.userDetails.watchlist;
    this.#changeFilm(updatedFilm);
  };
}
