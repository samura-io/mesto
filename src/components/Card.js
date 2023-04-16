export default class Card {
  constructor({ items, handleCardClick }, templateSelector) {
    this._link = items.link;
    this._title = items.name;
    this._templateSelector = templateSelector;
    this._openFunction = handleCardClick;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(`#${this._templateSelector}`)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  };

  _likeCard = () => {
    this.likeCard.classList.toggle("card__like-button_active");
  };

  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    this.likeCard = this._element.querySelector(".card__like-button");
    this.likeCard.addEventListener("click", this._likeCard);

    const deleteButton = this._element.querySelector(".card__trash");
    deleteButton.addEventListener("click", this._deleteCard);

    const cardImage = this._element.querySelector(".card__image");
    cardImage.addEventListener("click", this._openFunction);
  };

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._title;
    this._element.querySelector(".card__name").textContent = this._title;
    this._setEventListeners();

    return this._element;
  };
}
