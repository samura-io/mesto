import { Card } from "./Card.js";
import {FormValidator} from './FormValidator.js'
export {openPopup, popupImageConteiner, popupImage, popupCaption}

const popupEditProfile = document.querySelector('.popup_content_profile'); // Окно попапа профиля
const popupOpenButton = document.querySelector('.profile__edit-button'); // Кнопка открытия попапа профиля
const popupFormInputsName = document.querySelector('.popup__input_value_name'); // Поле с именем профиля
const popupFormInputsProfessuon = document.querySelector('.popup__input_value_profession'); // Поле с информацией о профессии
const profileName = document.querySelector('.profile__name'); // Элемент с именем профиля в основном документе
const profileProfession = document.querySelector('.profile__profession'); // Элемент с профессией профиля в основном документе
const popupForm = document.querySelector('.popup__form_type_profile'); // Форма попапа профиля
const sectionCard = document.querySelector('.cards'); // Секция карточек
const popupAddCard = document.querySelector('.popup_content_card'); // Окно попапа карточек
const popupAddCardOpenButton = document.querySelector('.profile__add-button'); // Кнопка открытия попапа карточек
const popupFormInputsPlace = document.querySelector('.popup__input_value_place'); // Поле с названием места
const popupFormInputsLink = document.querySelector('.popup__input_value_link'); // Поле с ссылкой на изображение
const popupFormAdd = document.querySelector('.popup__form_type_card');  // Форму попапа карточек
const popupImageConteiner = document.querySelector('.popup_content_image'); // Окно попапа просмотра изображения
const popupImage = document.querySelector('.popup__image'); // Изображение в попапе
const popupCaption = document.querySelector('.popup__caption'); // Подпись в попапе
const closeButton = document.querySelectorAll('.popup__close-button'); // Все креcтики закрыть
const escapeKey = 'Escape';
const cardTemplate = '#card-template';

// Конфигурация валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }
  
// Массив с изображениями для карточек
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

// Закрыть попапы с помощью ESC
function closePopupByEsc(evt) {
  const openPopupSelector = document.querySelector('.popup_opened'); // открытый попап
  if (evt.key === escapeKey){closePopup(openPopupSelector)} 
}

// Открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  // Добавить обработчик закрытия по ESC
  document.addEventListener('keydown', closePopupByEsc);
};

// Закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  // Удалить обработчик закрытия по ESC
  document.removeEventListener('keydown', closePopupByEsc);
};

// Отправить форму данных профиля
function submitEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupFormInputsName.value;
  profileProfession.textContent = popupFormInputsProfessuon.value;
  closePopup(popupEditProfile);
};

// Отправить форму данных карточки
function submitCardForm(evt) {
  evt.preventDefault();
  const data = {name: popupFormInputsPlace.value, link: popupFormInputsLink.value};
  addCard(data, cardTemplate);
  closePopup(popupAddCard);
  evt.target.reset();
};

// создаем карточку
function createCard(data, templateSelector) {
  const card = new Card(data, templateSelector);
  return card
}

// Добавить карточку в секцию
function addCard(data, templateSelector){
  const cardElement = createCard(data, templateSelector).generateCard()
  sectionCard.prepend(cardElement);
}

// Обновляем карточки из массива
initialCards.forEach(function(item) {
  addCard(item, cardTemplate)
})

popupForm.addEventListener('submit', submitEditForm);  // Слушатель отправки формы редактирования профиля
popupFormAdd.addEventListener('submit', submitCardForm); // Слушатель открытия попапа добавления карточек
popupAddCardOpenButton.addEventListener('click', () => {openPopup(popupAddCard);
  cardForm.resetValidation()}); // Слушатель открытия попапа добавления карточек
popupOpenButton.addEventListener('click', () => {openPopup(popupEditProfile);
  popupFormInputsName.value = profileName.textContent;
  popupFormInputsProfessuon.value = profileProfession.textContent;
  profileForm.resetValidation()}); // Слушатель открытия попапа редактирования профиля

// Закрытие любых попапов
closeButton.forEach((button)=>{
  const popup = button.closest('.popup');
  // Закрытие кликом на крестик
  button.addEventListener('click', () => closePopup(popup));
  // Закрытие кликом на оверлей
  popup.addEventListener("mousedown", (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popup)
    }
  })
});

const profileForm = new FormValidator(validationConfig, popupEditProfile);
profileForm.enableValidation()
const cardForm = new FormValidator(validationConfig, popupAddCard);
cardForm.enableValidation()