export const popupEditProfile = document.querySelector('.popup_content_profile');
export const popupOpenButton = document.querySelector('.profile__edit-button');
export const popupFormInputsName = document.querySelector('.popup__input_value_name');
export const popupFormInputsProfession = document.querySelector('.popup__input_value_profession');
export const popupAddCard = document.querySelector('.popup_content_card');
export const popupAddCardOpenButton = document.querySelector('.profile__add-button');
export const userInfoSelectors = {name: '.profile__name', profession: '.profile__profession', avatar: '.profile__img'};
export const trashButton = document.querySelector('.card__trash');
export const popupAvatar = document.querySelector('.popup_avatar');
export const popupAvatarOpenButton = document.querySelector('.profile__edit-img');

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  };