import BoardPresenter from './presenter/board-presenter.js';
import FilmsModel from './model/films-model.js';

const siteMainElement = document.querySelector('.main');
const boardPresenter = new BoardPresenter();

const filmsModel = new FilmsModel();
// const commentsModel = new CommentsModel();

boardPresenter.init(siteMainElement, filmsModel);
