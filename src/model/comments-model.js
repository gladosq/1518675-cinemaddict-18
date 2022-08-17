import {generateCommentInfo} from '../mock/comment.js';

export default class CommentsModel {
  comments = Array.from({length: 4}, generateCommentInfo);

  getComments = () => this.comments;
}
