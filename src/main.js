// import NewSortFilterView from './view/new-sort-filter-view.js';
// import NewFilmCardView from './view/film-card-view.js';
// import NewFilmListView from './view/film-list-view.js';
// import NewHeaderProfileView from './view/header-profile-view.js';
// import NewShowMoreButtonView from './view/show-more-button-view.js';
// import NewPopupWrapperView from './view/popup-wrapper-view.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteMainElement = document.querySelector('.main');
const boardPresenter = new BoardPresenter();

boardPresenter.init(siteMainElement);
