import { openPopup, popupImageConteiner, popupImage, popupCaption } from "./index.js";

export class Card {
    constructor(data, templateSelector) {
        this._link = data.link;
        this._title = data.name;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content.querySelector('.card').cloneNode(true);
        
        return cardElement;
        
    }

    _likeCard = () => {
      this.likeCard.classList.toggle('card__like-button_active');
    }

    _deleteCard = () => {
      this._element.remove()
    }

    _openCard = () => {
      openPopup(popupImageConteiner);
      popupImageConteiner.classList.add('popup_zoom_active');
      popupImage.src = this._link;
      popupImage.alt = this._title;
      popupCaption.textContent = this._title;
    }

    _setEventListeners() {
      this.likeCard = this._element.querySelector('.card__like-button');
      this.likeCard.addEventListener('click', this._likeCard);

      const deleteButton = this._element.querySelector('.card__trash');
      deleteButton.addEventListener('click', this._deleteCard);

      const cardImage = this._element.querySelector('.card__image');
      cardImage.addEventListener('click', this._openCard);
    }

    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._element.querySelector('.card__image').src = this._link;
      this._element.querySelector('.card__image').alt = this._title;
      this._element.querySelector('.card__name').textContent = this._title;
      this._setEventListeners();

      return this._element;
  }
}