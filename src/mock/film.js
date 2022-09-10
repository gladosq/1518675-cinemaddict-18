import dayjs from 'dayjs';
import {nanoid} from 'nanoid';

import {getRandomInteger, getRandomDate} from '../utils.js';
import {FILM_NAMES, FILM_DESCRIPTIONS, FILM_GENRES, FILM_POSTERS, FILM_COUNTRIES} from '../mock/const.js';

const generateRandomDate = () => dayjs(getRandomDate()).format('DD MMMM YYYY');

const generateRandomRating = () => `${getRandomInteger(0, 9)}.${getRandomInteger(0, 9)}`;

const generateFilmName = () => {
  const randomIndex = getRandomInteger(0, FILM_NAMES.length - 1);
  return FILM_NAMES[randomIndex];
};

const generateFilmDescription = () => {
  const randomIndex = getRandomInteger(0, FILM_DESCRIPTIONS.length - 1);
  return FILM_DESCRIPTIONS[randomIndex];
};

const generateFilmGenre = () => {
  const randomIndex = getRandomInteger(0, FILM_GENRES.length - 1);
  return FILM_GENRES[randomIndex];
};

const generateFilmPoster = () => {
  const randomIndex = getRandomInteger(0, FILM_POSTERS.length - 1);
  return FILM_POSTERS[randomIndex];
};

const generateFilmCountry = () => {
  const randomIndex = getRandomInteger(0, FILM_COUNTRIES.length - 1);
  return FILM_COUNTRIES[randomIndex];
};

const genereateCommentsId = () => {
  const commentsId = [];

  while (commentsId.length < 4) {
    const randomId = getRandomInteger(0, 50);

    if (!commentsId.includes(randomId)) {
      commentsId.push(randomId);
    }
  }

  return commentsId;
};

export const generateFilmInfo = () => ({
  id: nanoid(5),
  comments: genereateCommentsId(),
  filmInfo: {
    title: generateFilmName(),
    alternativeTitle: 'Laziness Who Sold Themselves',
    totalRating: generateRandomRating(),
    poster: generateFilmPoster(),
    ageRating: '0',
    director: 'Tom Ford',
    writers: [
      'Takeshi Kitano'
    ],
    actors: [
      'Morgan Freeman'
    ],
    release: {
      date: generateRandomDate(),
      releaseCountry: generateFilmCountry()
    },
    runtime: 77,
    genre: [ generateFilmGenre() ],
    description: generateFilmDescription()
  },
  userDetails: {
    watchlist: false,
    alreadyWatched: true,
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: false
  }
});
