import {getRandomInteger, getRandomDate} from '../utils/utils.js';
import {FILM_COMMENTS, FILM_COMMENT_AUTHORS, FILM_COMMENT_REACTIONS} from '../mock/const.js';
import dayjs from 'dayjs';

const generateComment = () => {
  const randomIndex = getRandomInteger(0, FILM_COMMENTS.length - 1);
  return FILM_COMMENTS[randomIndex];
};

const generateAuthor = () => {
  const randomIndex = getRandomInteger(0, FILM_COMMENT_AUTHORS.length - 1);
  return FILM_COMMENT_AUTHORS[randomIndex];
};

const generateReaction = () => {
  const randomIndex = getRandomInteger(0, FILM_COMMENT_REACTIONS.length - 1);
  return FILM_COMMENT_REACTIONS[randomIndex];
};

const generateRandomDate = () => dayjs(getRandomDate()).format('YYYY/MM/DD hh:mm');

export const generateComments = (ids) => {
  const comments = [];

  ids.forEach((item) => {
    comments.push({
      id: item,
      author: generateAuthor(),
      comment: generateComment(),
      date: generateRandomDate(),
      emotion: generateReaction()
    });
  });

  return comments;
};
