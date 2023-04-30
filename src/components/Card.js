export default class Card {
  constructor({ items, handleCardClick, handleDeleteCard, handleLikeCard, handleDislikeCard}, templateSelector, userId) {
    this.userId = userId;
    this._link = items.link;
    this._title = items.name;
    this._likes = items.likes;
    this._cardId = items._id;
    this._ownerId = items.owner._id;
    this._templateSelector = templateSelector;
    this._openFunction = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._handleDislikecard = handleDislikeCard;
    this.element;
  };

  _rendererTrash(element){
    if (!(this.userId === this._ownerId)) {
      element.querySelector(".card__trash").style.display = 'none'
    } else {
    }
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(`#${this._templateSelector}`)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  };

  renderLikes(item) {
    this.likesCounter.textContent = item.length;
    this.isLiked = item.some((elem)=>{
      return this.userId === elem._id
    });
    this.isLiked ? this.likeCard.classList.add("card__like-button_active") : this.likeCard.classList.remove("card__like-button_active")
  };

  _likeCard = () => {
    if(this.isLiked) {
      this.likeCard.classList.remove("card__like-button_active")
      this._handleDislikecard();
    } else { 
      this.likeCard.classList.add("card__like-button_active");
      this._handleLikeCard();
    }
  };

  deleteCard() {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    this.likesCounter = this._element.querySelector(".card__like-counter")
    this.likeCard = this._element.querySelector(".card__like-button");
    this.renderLikes(this._likes);
    this.likeCard.addEventListener("click", this._likeCard);

    this.deleteButton = this._element.querySelector(".card__trash");
    this.deleteButton.addEventListener("click", ()=>{
      this._handleDeleteCard(this._cardId)
    });

    const cardImage = this._element.querySelector(".card__image");
    cardImage.addEventListener("click", this._openFunction);
  };

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._title;
    this._element.querySelector(".card__name").textContent = this._title;
    this.likesCounter.textContent = this._likes.length;
    this._rendererTrash(this._element);
    return this._element;
  };
}
