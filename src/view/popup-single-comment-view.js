import AbstractView from '../framework/view/abstract-view.js';

const createNewSingleComment = (_comment) => {
  const {author, comment, emotion} = _comment;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">2019/12/31 23:59</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export default class NewSingleCommentView extends AbstractView {
  #comment = null;
  constructor (comment) {
    super();
    this.#comment = comment;
  }

  #element = null;

  get template() {
    return createNewSingleComment(this.#comment);
  }
}
