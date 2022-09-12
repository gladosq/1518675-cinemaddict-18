import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';

const createNewFilmCard = (film) => {
  const {title, poster, description, totalRating} = film.filmInfo;

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${dayjs(film.filmInfo.release.date).format('YYYY')}</span>
          <span class="film-card__duration">1h 55m</span>
          <span class="film-card__genre">Musical</span>
        </p>
        <img src="${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <span class="film-card__comments">5 comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item ${film.userDetails.watchlist ? 'film-card__controls-item--active' : ''} film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item ${film.userDetails.alreadyWatched ? 'film-card__controls-item--active' : ''} film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item ${film.userDetails.favorite ? 'film-card__controls-item--active' : ''} film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class NewFilmCardView extends AbstractView {
  #film = null;

  constructor (film) {
    super();
    this.#film = film;
  }

  get template() {
    return createNewFilmCard(this.#film);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    if (evt.target.tagName === 'BUTTON') {
      return;
    }

    evt.preventDefault();

    this._callback.click(this.#film);
  };

  /* --- Обработчики на кнопку Favorite карточки --- */

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();

    evt.target.classList.toggle('film-card__controls-item--active');
  };

  /* --- Обработчики на кнопку Already Watched карточки --- */

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();

    evt.target.classList.toggle('film-card__controls-item--active');
  };

  /* --- Обработчики на кнопку Watch Later карточки --- */

  setWatchLaterClickHandler = (callback) => {
    this._callback.watchLaterClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchLaterClickHandler);
  };

  #watchLaterClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchLaterClick();

    evt.target.classList.toggle('film-card__controls-item--active');
  };
}
