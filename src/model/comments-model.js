import {generateComments} from '../mock/comment.js';

export default class CommentsModel {
  getComments = () => generateComments();
}
