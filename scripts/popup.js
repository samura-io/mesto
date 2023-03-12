const popupEditProfile = document.querySelector('.popup_content_profile'); // Окно попапа профиля
const popupOpenButton = document.querySelector('.profile__edit-button'); // Кнопка открытия попапа профиля
const popupFormInputsName = document.querySelector('.popup__input_value_name'); // Поле с именем профиля
const popupFormInputsProfessuon = document.querySelector('.popup__input_value_profession'); // Поле с информацией о профессии
const profileName = document.querySelector('.profile__name'); // Элемент с именем профиля в основном документе
const profileProfession = document.querySelector('.profile__profession'); // Элемент с профессией профиля в основном документе
const popupForm = document.querySelector('.popup__form_type_profile'); // Форма попапа профиля
const sectionCard = document.querySelector('.cards'); // Секция карточек
const templateCardContent = document.querySelector('#card-template').content; // Содержимое template-элемента
const popupAddCard = document.querySelector('.popup_content_card'); // Окно попапа карточек
const popupAddCardOpenButton = document.querySelector('.profile__add-button'); // Кнопка открытия попапа карточек
const popupFormInputsPlace = document.querySelector('.popup__input_value_place'); // Поле с названием места
const popupFormInputsLink = document.querySelector('.popup__input_value_link'); // Поле с ссылкой на изображение
const popupFormAdd = document.querySelector('.popup__form_type_card');  // Форму попапа карточек
const popupImageConteiner = document.querySelector('.popup_content_image'); // Окно попапа просмотра изображения
const popupImage = document.querySelector('.popup__image'); // Изображение в попапе
const popupCaption = document.querySelector('.popup__caption'); // Подпись в попапе
const closeButton = document.querySelectorAll('.popup__close-button'); // Все кремтики закрыть



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

// Открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

// Закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

// Отправить форму данных профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupFormInputsName.value;
  profileProfession.textContent = popupFormInputsProfessuon.value;
  closePopup(popupEditProfile);
};


// Отправить форму данных карточки
function submitCardForm(evt) {
  evt.preventDefault();
  addCard (popupFormInputsPlace.value, popupFormInputsLink.value);
  closePopup(popupAddCard);
  evt.target.reset();
};

// Создать карточку
function createCard(name, link) {
  const cardElement = templateCardContent.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = link; // добавляем ссылку на изображение
  cardElement.querySelector('.card__image').alt = name; // добавляем alt изображению
  cardElement.querySelector('.card__name').textContent = name; // добавляем текст карточке

  // Лайкаем
  const likeCard = cardElement.querySelector('.card__like-button');
  likeCard.addEventListener('click', function(evt){ 
    evt.target.classList.toggle('card__like-button_active');
  });

  // Удалаяем
  const deleteButton = cardElement.querySelector('.card__trash');
  deleteButton.addEventListener('click', function(){
    cardElement.remove();
  });

  // Открываем изображение
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', function(){
    openPopup(popupImageConteiner);
    popupImageConteiner.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    popupImage.src= link;
    popupImage.alt= name;
    popupCaption.textContent= name;
  });
  
  return cardElement;
};

// Добавить карточку
function addCard(cardName, cardLink){
  const cardElement = createCard(cardName, cardLink);
  sectionCard.prepend(cardElement);
}

// Обновляем карточки из массива
for (i=0; i < initialCards.length; i++) {
  addCard(initialCards[i].name,initialCards[i].link);
};

popupForm.addEventListener('submit', handleFormSubmit);  // Слушатель отправки формы редактирования профиля
popupFormAdd.addEventListener('submit', submitCardForm); // Слушатель открытия попапа добавления карточек
popupAddCardOpenButton.addEventListener('click', () => openPopup(popupAddCard)); // Слушатель открытия попапа добавления карточек
popupOpenButton.addEventListener('click', () => {openPopup(popupEditProfile);
  popupFormInputsName.value = profileName.textContent;
  popupFormInputsProfessuon.value = profileProfession.textContent;}); // Слушатель открытия попапа редактирования профиля

// Закрытие любых попапов
closeButton.forEach((button)=>{
  const popup = button.closest('.popup');
  // Закрытие кликом на крестик
  button.addEventListener('click', () => closePopup(popup));
  // Закрытие кнопкой ESC
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape'){closePopup(popup)}
  });
  // Закрытие кликом на оверлей
  popup.addEventListener("mousedown", (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popup)
    }
  })
});