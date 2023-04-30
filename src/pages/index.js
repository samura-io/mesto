import './index.css';
import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForms from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api';

import {
  popupEditProfile,
  popupOpenButton,
  popupFormInputsName,
  popupFormInputsProfession,
  popupAddCard,
  popupAddCardOpenButton,
  userInfoSelectors,
  validationConfig,
  popupAvatar,
  popupAvatarOpenButton
} from '../utils/constants.js';
import PopupConfirm from '../components/PopupConfirm';

let userId;

// Инициализация класса userInfo
const userInfo = new UserInfo({userInfoSelectors});

// Инициализация класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '9ce7371f-440d-4cd2-b2ea-17da2fc5b4e4',
    'Content-Type': 'application/json'
  }
}); 

// Получаем информацию о пользователе и объект карточек с сервера
Promise.all([
  api.getUserInfo(),
  api.getInitialCards(),
])
.then(([data, card])=>{
  userInfo.setUserInfo(data);
  userInfo.setAvatar(data);
  userId = data._id;
  section.renderItems(card);
})
.catch((err)=>{
  console.log(err)
})

// Удаление карточки
const popupDeleteCard = new PopupConfirm({submitFunction: (card)=>{
  popupDeleteCard.renderLoading(true);
  api.deleteCard(card._cardId).then(()=>{
    popupDeleteCard.close();
    card.deleteCard();
  })
  .catch((err)=>{
    console.log(err)
  })
  .finally(()=>{
    popupDeleteCard.renderLoading(false);
  })
}},'.popup_delete-card');
popupDeleteCard.setEventListeners();

// Добавить карточку
function addCard(item){
  const card = new Card({items: item,
  handleCardClick: ()=>{popupWithImage.open(item)},
  handleDeleteCard: ()=>{popupDeleteCard.open(card)},
  handleLikeCard: ()=>{
    api.likeCard(card._cardId).then((res)=>{
      card.renderLikes(res.likes)
    })
    .catch((err)=>{
      console.log(err)
    })
},
  handleDislikeCard: ()=>{
    api.dislikeCard(card._cardId).then((res)=>{
      card.renderLikes(res.likes)
    })
    .catch((err)=>{
      console.log(err)
    })
}}, 'card-template', userId);
  const cardElement = card.generateCard();
  return cardElement;
};

// Инициализация валидаторов
const profileFormValidator = new FormValidator(validationConfig, popupEditProfile);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationConfig, popupAddCard);
cardFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(validationConfig, popupAvatar);
avatarFormValidator.enableValidation();

// инициализация попапа открытия карточки
const popupWithImage = new PopupWithImage('.popup_content_image');
popupWithImage.setEventListeners();

// Аватар
const popupWithFormsAvatar = new PopupWithForms({submitFunction: (data)=>{
  popupWithFormsAvatar.renderLoading(true);
  api.avatarEdit(data.avatar).then((res)=>{
    userInfo.setAvatar(res)
    popupWithFormsAvatar.close();
  }).catch((err)=>{
    console.log(err)
  })
  .finally(()=>{
    popupWithFormsAvatar.renderLoading(false);
  });
  }}, '.popup_avatar');
popupWithFormsAvatar.setEventListeners();

// Информация о пользователе
const popupWithFormsProfile = new PopupWithForms({submitFunction: (data)=>{
  popupWithFormsProfile.renderLoading(true);
  api.editUserInfo(data.username, data.profession).then((res)=>{
    userInfo.setUserInfo({name: res.name, about: res.about});
    popupWithFormsProfile.close();
  })
  .catch((err)=>{
    console.log(err)
  })
  .finally(()=>{
    popupWithFormsProfile.renderLoading(false);
  })
}}, '.popup_content_profile');
popupWithFormsProfile.setEventListeners();

// Инициализация класса Section
const section = new Section({renderer: (item)=>{ 
  const cardElement = addCard(item);
  section.addItems(cardElement);
}}, '.cards');

// Загрузка информации о карточках
const popupWithFormsCard = new PopupWithForms({submitFunction: (data)=>{
  popupWithFormsCard.renderLoading(true);
  api.addCard(data).then((res)=>{
  const cardElement = addCard(res);
  section.addItem(cardElement);
  popupWithFormsCard.close();
  })
  .catch((err)=>{
    console.log(err)
  })
  .finally(()=>{
    popupWithFormsCard.renderLoading(false);
  })
}}, '.popup_content_card');
popupWithFormsCard.setEventListeners();

// Слушатель открытия попапа изменения информации пользователя
popupOpenButton.addEventListener('click', () => {popupWithFormsProfile.open();
  const ObjWithUserInfo = userInfo.getUserInfo();
  popupFormInputsName.value = ObjWithUserInfo.username;
  popupFormInputsProfession.value = ObjWithUserInfo.profession;
  profileFormValidator.resetValidation();
});

// Слушатель открытия попапа добавления карточки
popupAddCardOpenButton.addEventListener('click', () => {
  popupWithFormsCard.open();
  cardFormValidator.resetValidation();
});

// Слушатель открытия попапа изменения аватара
popupAvatarOpenButton.addEventListener('click', () => {
  popupWithFormsAvatar.open();
  avatarFormValidator.resetValidation();
});