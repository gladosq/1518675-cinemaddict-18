import dayjs from 'dayjs';

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
  const sortedFilms = films;
  return sortedFilms.sort((a, b) => (dayjs(b.filmInfo.release.date).isAfter(dayjs(a.filmInfo.release.date)) ? 1 : -1));
};

const sortByRating = (films) => {
  const sortedFilms = films;
  return sortedFilms.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
};


const sortTypeChange = (sortType) => {

  if (sortType === 'by-date') {
    return sortByDate;
  }

  if (sortType === 'by-rating') {
    return sortByRating;
  }

  return false;
};

const updateFilm = (films, update) => {
  const index = films.findIndex((film) => film.id === update.id);

  if (index === -1) {
    return films;
  }

  return [
    ...films.slice(0, index),
    update,
    ...films.slice(index + 1),
  ];
};

export {updateFilm, getRandomInteger, getRandomDate, checkNotEsc, sortByDate, sortByRating, sortTypeChange};
