import NewSortFilterView from '../view/new-sort-filter-view.js';

import NewFilmListView from '../view/film-list-view.js';
import NewFilmCardView from '../view/film-card-view.js';
// import NewHeaderProfileView from '../view/header-profile-view.js';
import NewShowMoreButtonView from '../view/show-more-button-view.js';
import NewPopupWrapperView from '../view/popup-wrapper-view.js';
import NewPopupTopContainerView from '../view/popup-top-container-view.js';
import NewPopupBottomContainerView from '../view/popup-bottom-container-view.js';
import NewBoardView from '../view/board-view.js';

import {render, RenderPosition} from '../render.js';

export default class BoardPresenter {
  boardComponent = new NewBoardView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(this.boardComponent, this.boardContainer);
    render(new NewSortFilterView(), this.boardComponent.getElement());
    render(new NewFilmListView(), this.boardComponent.getElement());

    const filmList = document.querySelector('.films-list__container');
    render(new NewFilmCardView(), filmList);
    render(new NewShowMoreButtonView(), filmList);

    const footer = document.querySelector('.footer');
    render(new NewPopupWrapperView(), footer, RenderPosition.AFTEREND);
    const popupInnerWrapper = document.querySelector('.film-details__inner');

    render(new NewPopupTopContainerView(), popupInnerWrapper);
    render(new NewPopupBottomContainerView(), popupInnerWrapper);
  };
}
