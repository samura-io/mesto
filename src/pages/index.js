import './index.css';
import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForms from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import {
  popupEditProfile,
  popupOpenButton,
  popupFormInputsName,
  popupFormInputsProfession,
  popupAddCard,
  popupAddCardOpenButton,
  userInfoSelectors,
  validationConfig,
  initialCards
} from '../utils/constants.js';

function addCard({place, link}){
  const items = {name: place, link: link};
  const card = new Card({items: items,
  handleCardClick: ()=>{popupWithImage.open(items.link, items.name)}
}, 'card-template');
  const cardElement = card.generateCard();
  return cardElement;
};

const userInfo = new UserInfo({userInfoSelectors});

const profileFormValidator = new FormValidator(validationConfig, popupEditProfile);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationConfig, popupAddCard);
cardFormValidator.enableValidation();

const popupContentProfile = new Popup('.popup_content_profile');
popupContentProfile.setEventListeners();


const popupContentCard = new Popup('.popup_content_card');
popupContentCard.setEventListeners();
popupAddCardOpenButton.addEventListener('click', () => {
  popupContentCard.open();
  cardFormValidator.resetValidation();
});

const popupWithImage = new PopupWithImage('.popup_content_image');
popupWithImage.setEventListeners();

const section = new Section({items: initialCards, renderer: (item)=>{ 
  const cardElement = addCard({place: item.name, link: item.link});
  section.addItem(cardElement);
}}, '.cards');
section.renderItems();

const popupWithFormsProfile = new PopupWithForms({submitFunction: (data)=>{
  userInfo.setUserInfo(data.name, data.profession);
  popupWithFormsProfile.close();
}}, '.popup_content_profile');
popupWithFormsProfile.setEventListeners();

const popupWithFormsCard = new PopupWithForms({submitFunction: (data)=>{
  const cardElement = addCard({place: data.place, link: data.link});
  section.addItem(cardElement);
  popupWithFormsCard.close();
}}, '.popup_content_card');
popupWithFormsCard.setEventListeners();

popupOpenButton.addEventListener('click', () => {popupContentProfile.open();
  popupFormInputsName.value = userInfo.getUserInfo().name;
  popupFormInputsProfession.value = userInfo.getUserInfo().profession;
  profileFormValidator.resetValidation();
});