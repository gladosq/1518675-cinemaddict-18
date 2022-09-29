const FILM_NAMES = [
  'The Dance of Life',
  'Sagebrush Trail',
  'The Man with the Golden Arm',
  'Santa Claus Conquers the Martians',
  'Popeye the Sailor Meets Sindbad the Sailor',
  'The Man with the Golden Arm',
  'The Great Flamarion',
  'Santa Claus Conquers the Martians',
  'Made for Each Other'
];

const FILM_DESCRIPTIONS = [
  'Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…',
  'Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant`s narrow escap…',
  'Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…',
  'The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…',
  'In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…',
  'Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…',
  'The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Grea…',
  'The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…',
  'John Mason (James Stewart) is a young, somewhat timid attorney in New York City. He has been doing his job well, and he has a chance of bei…'
];

const FILM_GENRES = ['Musical', 'Western', 'Drama', 'Comedy', 'Cartoon', 'Mystery'];

const FILM_POSTERS = [
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg'
];

const FILM_COMMENTS = [
  'With the Walgreens deadline looming, Elizabeth and Sunny scramble to find solutions to their technological failures; Ian is drawn into Elizabeth`s lawsuit against Richard.',
  'This film seems to understand its own absurdity much better than the first, and rightly so.',
  'William Brent Bell’s film proves that not every horror concept has the potential to be franchised.',
  'Fans deserve better servicing than this.',
  'It’s the rare prequel that surpasses the original.'
];

const FILM_COMMENT_AUTHORS = [
  'Courtney Howard', 'Mark Hanson', 'Brian Orndorf', 'Nathaniel Muir', 'Robert Kojder', 'Leila Latif'
];

const FILM_COMMENT_REACTIONS = ['smile', 'sleeping', 'puke', 'angry'];

const FILM_COUNTRIES = ['Finland', 'Russia', 'Germany', 'Spain', 'Italy', 'Japan'];

const SortType = {
  DEFAULT: 'default',
  BY_DATE: 'by-date',
  BY_RATING: 'by-rating'
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

const UserAction = {
  SORT: 'sort',
  FILTER: 'filter'
};

export {FilterType, UpdateType, UserAction, SortType, FILM_NAMES, FILM_DESCRIPTIONS, FILM_GENRES, FILM_POSTERS, FILM_COMMENTS, FILM_COMMENT_AUTHORS, FILM_COMMENT_REACTIONS, FILM_COUNTRIES};
