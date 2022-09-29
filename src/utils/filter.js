import {FilterType} from '../mock/const.js';
// import {isTaskExpired, isTaskExpiringToday, isTaskRepeating} from './task';

const filter = {
  [FilterType.ALL]: (films) => films.filter((film) => film.userDetails.favorite),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched)
};

export {filter};
