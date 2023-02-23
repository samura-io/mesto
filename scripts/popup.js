const popupEditProfile = document.querySelector('.popup_content_profile'); // Окно попапа редактирования профиля
const popupOpenButton = document.querySelector('.profile__edit-button'); // Выбираем кнопку открытия попапа редактирования профиля
const popupCloseButton = document.querySelector('.popup__close-button_type_profile'); // Выбираем кнопку закрытия попапа редактирования профиля
const popupFormInputsName = document.querySelector('.popup__input_value_name'); // Выбираем поле с именем профиля
const popupFormInputsProfessuon = document.querySelector('.popup__input_value_profession'); // Выбираем поле с информацией о профессии
const profileName = document.querySelector('.profile__name'); // Выбираем елемент с именем профиля в основном документе
const profileProfession = document.querySelector('.profile__profession'); // Выбираем елемент с профессией профиля в основном документе
const popupForm = document.querySelector('.popup__form_type_profile'); // Выбираем форму попапа редактирования профиля
const sectionCard = document.querySelector('.cards'); // Выбираем секцию карточек
const templateCardContent = document.querySelector('#card-template').content; // Получаем содержимое template-элемента
const popupAddCard = document.querySelector('.popup_content_card'); // Окно попапа добавления карточек
const popupAddCardOpenButton = document.querySelector('.profile__add-button'); // Выбираем кнопку открытия попапа добавления карточек
const popupAddCardCloseButton = document.querySelector('.popup__close-button_type_card'); // Выбираем кнопку закрытия попапа добавления карточек 
const popupFormInputsPlace = document.querySelector('.popup__input_value_place'); // Выбираем поле с названием места
const popupFormInputsLink = document.querySelector('.popup__input_value_link'); // Выбираем поле с ссылкой на изображение
const popupFormAdd = document.querySelector('.popup__form_type_card');  // Выбираем форму попапа добавления карточек
const popupImageConteiner = document.querySelector('.popup_content_image'); // Выбираем окно попапа просмотра изображения
const closeButtonPopupImage = document.querySelector('.popup__close-button_type_image'); // Выбираем кнопкузакрытия попапа просмотра изображения


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

// Функция открытия попапа редактирования профиля
function openPopup() {
  popupEditProfile.classList.add('popup_opened');
  popupFormInputsName.value = profileName.textContent;
  popupFormInputsProfessuon.value = profileProfession.textContent;
};

// Функция закрытия попапа редактирования профиля
function closePopup() {
  popupEditProfile.classList.remove('popup_opened');
};

// Функция отправки формы попапа редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupFormInputsName.value;
  profileProfession.textContent = popupFormInputsProfessuon.value;
  closePopup();
};

// Функция открытия попапа добавления карточки
function openPopupAddCard() {
  popupAddCard.classList.add('popup_opened');
};

// Функция закрытия попапа добавления карточки
function closePopupAddCard() {
  popupAddCard.classList.remove('popup_opened');
};

// Функция отправки формы попапа добавления карточки
function submitCardForm(evt) {
  evt.preventDefault();
  addCard (popupFormInputsPlace.value, popupFormInputsLink.value);
  closePopupAddCard();
  UpdateCard();
}

// Добавить карточку
function addCard (name, link){
  const CardElement = templateCardContent.querySelector('.card').cloneNode(true);
  CardElement.querySelector('.card__image').src = link; // добавляем ссылку на изображение
  CardElement.querySelector('.card__image').alt = name; // добавляем alt изображению
  CardElement.querySelector('.card__name').textContent = name; // добавляем текст карточке
  sectionCard.prepend(CardElement); // добавляем карточку на страницу

  // Лайкаем карточку
  const likeCard = document.querySelector('.card__like-button');
  likeCard.addEventListener('click', function(evt){ 
    evt.target.classList.toggle('card__like-button_active');
  });

  // Удалаяем карточку
  const deleteButton = document.querySelector('.card__trash');
  deleteButton.addEventListener('click', function(){
    CardElement.remove();
  });

  // Открываем изображение
  const cardImage = document.querySelector('.card__image');
  cardImage.addEventListener('click', function(){
    popupImageConteiner.classList.add('popup_opened');
    popupImageConteiner.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    document.querySelector('.popup__image').src= link;
    document.querySelector('.popup__image').alt= name;
    document.querySelector('.popup__caption').textContent= name;
  });
};

// ЗАкрываем изображение
function closePopupImage() {
  popupImageConteiner.classList.remove('popup_opened');
};


// Обновляем карточки из массива
for (i=0; i < initialCards.length; i++) {
  addCard(initialCards[i].name,initialCards[i].link);
};

popupOpenButton.addEventListener('click', openPopup); // Слушатель открытия попапа редактирования профиля
popupCloseButton.addEventListener('click', closePopup); // Слушатель закрытия попапа редактирования профиля
popupForm.addEventListener('submit', handleFormSubmit);  // Слушатель отправки формы редактирования профиля
popupAddCardOpenButton.addEventListener('click', openPopupAddCard); // Слушатель открытия попапа добавления карточек
popupAddCardCloseButton.addEventListener('click', closePopupAddCard); // Слушатель открытия попапа добавления карточек
popupFormAdd.addEventListener('submit', submitCardForm); // Слушатель открытия попапа добавления карточек
closeButtonPopupImage.addEventListener('click', closePopupImage) // Слушатель закрытия попапа просмотра изображения