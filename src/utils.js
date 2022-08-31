import dayjs from 'dayjs';
import {SORT_TYPES} from './mock/const.js';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomDate = () => {
  const maxDate = Date.now();
  const timestamp = Math.floor(Math.random() * maxDate);
  return new Date(timestamp);
};


const checkNotEsc = (evt) => evt.type === 'keydown' && evt.key !== 'Escape';

const sortByDate = (films) => {
  return films.sort((a, b) => (dayjs(a.filmInfo.release.date).isAfter(dayjs(b.filmInfo.release.date)) ? 1 : -1));
};

const sortByRating = (films) => {
  return films.sort((a, b) => a.filmInfo.totalRating - b.filmInfo.totalRating);
};

const sortTypeChange = (sortType) => {
  console.log(sortType);
};

export {getRandomInteger, getRandomDate, checkNotEsc, sortByDate, sortByRating, sortTypeChange};
