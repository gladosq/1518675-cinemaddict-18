import BoardPresenter from './presenter/board-presenter.js';
import FilmPresenter from './presenter/film-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

const siteMainElement = document.querySelector('.main');
const boardPresenter = new BoardPresenter();

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

boardPresenter.init(siteMainElement, filmsModel);
