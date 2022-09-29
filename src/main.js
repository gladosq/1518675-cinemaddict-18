import {render} from './framework/render.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmsModel from './model/films-model.js';
import FilterModel from './model/filter-model.js';

import {RenderPosition} from './render.js';

import NewMainNavigationView from './view/main-navigation-view.js';

const siteMainElement = document.querySelector('.main');

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter(siteMainElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filmsModel, filterModel);

// render(new NewMainNavigationView(filters, 'all'), siteMainElement, RenderPosition.BEFOREBEGIN);

filterPresenter.init();
boardPresenter.init();
