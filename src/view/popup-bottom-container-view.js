import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const createNewPopupBottomContainer = () => `
    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>

        <ul class="film-details__comments-list">
        </ul>

        <form class="film-details__new-comment" action="" method="get">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </form>
      </section>
    </div>`;

export default class NewPopupBottomContainerView extends AbstractStatefulView {
  #film = null;

  constructor (film) {
    super();
    // this.#film = film;

    this._state = NewPopupBottomContainerView.parseTaskToState(film);
  }

  #element = null;

  #restoreHandlers = () => {

  };

  get template() {
    // return createNewPopupBottomContainer(this.#film);

    return createNewPopupBottomContainer(this._state);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.film-details__new-comment').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = () => {

  };

  static parseTaskToState = (film) => ({...film,

  });

  static parseStateToTask = () => {

  };

  setChangeEmojiHandler = (callback) => {
    this._callback.changeEmojiClick = callback;
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#changeEmojiHandler);

  };

  #changeEmojiHandler = (evt) => {

    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this._callback.changeEmojiClick();

    document.querySelector(`.film-details__emoji-item[value="${evt.target.value}"]`).checked = true;
    document.querySelector('.film-details__add-emoji-label').innerHTML = `<img src="images/emoji/${evt.target.value}.png" width="55" height="55" alt="emoji-smile">`;
  };
}
