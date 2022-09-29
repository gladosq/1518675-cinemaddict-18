import Observable from '../framework/observable.js';
import {generateComments} from '../mock/comment.js';

export default class CommentsModel {
  getComments = () => generateComments();

  get comments() {
    return this.#comments;
  }

  updateFilm = (updateComment, update) => {
    const index = this.#comments.findIndex((comments) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      update,
      ...this.#comments.slice(index + 1),
    ];

    this._notify(UpdateType, update);
  };
}
