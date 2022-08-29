import NewSingleCommentView from '../view/popup-single-comment-view.js';
import NewPopupWrapperView from '../view/popup-wrapper-view.js';
import NewPopupTopContainerView from '../view/popup-top-container-view.js';
import NewPopupBottomContainerView from '../view/popup-bottom-container-view.js';
import NewFilmCardView from '../view/film-card-view.js';
import NewShowMoreButtonView from '../view/show-more-button-view.js';

import {generateComments} from '../mock/comment.js';
import {RenderPosition} from '../render.js';
import {render} from '../framework/render.js';

import {checkNotEsc} from '../utils.js';

export default class FilmPresenter {

  init = (film) => {
    const renderComments = (comments) => {
      const filmCommentsList = document.querySelector('.film-details__comments-list');
      for (let i = 0; i < comments.length; i++) {
        render(new NewSingleCommentView(comments[i]), filmCommentsList);
      }
    };

    const hidePopup = () => {
      document.querySelector('.film-details').remove();
      document.body.classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (checkNotEsc) {
        evt.preventDefault();

        hidePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const footer = document.querySelector('.footer');

    const showPopup = () => {
      render(new NewPopupWrapperView(), footer, RenderPosition.AFTEREND);
      const popupInnerWrapper = document.querySelector('.film-details__inner');
      render(new NewPopupTopContainerView(film['filmInfo']), popupInnerWrapper);
      render(new NewPopupBottomContainerView(film['comments']), popupInnerWrapper);

      document.body.classList.add('hide-overflow');
    };


    /* --- обработчик при клике на попап --- */
    const filmComponent = new NewFilmCardView(film);
    filmComponent.setClickHandler(() => {

      /* --- показываем попап с информацией по фильму и без комментариев --- */
      showPopup();

      /* --- генерирум комментарии по айдишникам --- */
      const comments = generateComments(film['comments']);

      /* --- рендерим комментарии во view --- */
      renderComments(comments);

      document.addEventListener('keydown', onEscKeyDown);

      const loadMoreButtonComponent = new NewShowMoreButtonView();

      loadMoreButtonComponent.setClickHandler(() => {
        document.removeEventListener('keydown', onEscKeyDown);
        hidePopup();
      });
    });

    const filmList = document.querySelector('.films-list__container');

    render(filmComponent, filmList);
  };
}
