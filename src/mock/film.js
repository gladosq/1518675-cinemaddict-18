import {getRandomInteger} from '../utils.js';
import {FILM_NAMES, FILM_DESCRIPTIONS, FILM_GENRES, FILM_POSTERS} from '../mock/const.js';

const generateFilmName = () => {
  const randomIndex = getRandomInteger(0, FILM_NAMES.length - 1);
  return FILM_NAMES[randomIndex];
};

const generateFilmDescription = () => {
  const randomIndex = getRandomInteger(0, FILM_DESCRIPTIONS.length - 1);
  return FILM_NAMES[randomIndex];
};

const generateFilmGenre = () => {
  const randomIndex = getRandomInteger(0, FILM_GENRES.length - 1);
  return FILM_GENRES[randomIndex];
};

const generateFilmPoster = () => {
  const randomIndex = getRandomInteger(0, FILM_POSTERS.length - 1);
  return FILM_POSTERS[randomIndex];
};

export const generateFilmInfo = () => ({
  id: 0,
  comments: ['bla1', 'bla2'],
  filmInfo: {
    title: generateFilmName(),
    alternativeTitle: 'Laziness Who Sold Themselves',
    totalRating: '5.3',
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
      date: '2019-05-11T00:00:00.000Z',
      releaseCountry: 'Finland'
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
