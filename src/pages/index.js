import './index.css';
import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
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

popupOpenButton.addEventListener('click', () => {popupWithFormsProfile.open();
  const ObjWithUserInfo = userInfo.getUserInfo()
  popupFormInputsName.value = ObjWithUserInfo.name;
  popupFormInputsProfession.value = ObjWithUserInfo.profession;
  profileFormValidator.resetValidation();
});

popupAddCardOpenButton.addEventListener('click', () => {
  popupWithFormsCard.open();
  cardFormValidator.resetValidation();
});