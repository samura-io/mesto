
let popupWindow = document.querySelector('.popup');

let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');

let popupFormInputsName = document.querySelector('.popup__input_name');
let popupFormInputsProfessuon = document.querySelector('.popup__input_profession');

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

let popupForm = document.querySelector('.popup__form');

function popupOpening() {
    popupWindow.classList.add('popup_opened');
    popupFormInputsName.value = profileName.textContent;
    popupFormInputsProfessuon.value = profileProfession.textContent;
};

function popupClosing() {
    popupWindow.classList.remove('popup_opened');
};

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = popupFormInputsName.value;
    profileProfession.textContent = popupFormInputsProfessuon.value;
    popupClosing();
}

popupOpenButton.addEventListener('click', popupOpening);
popupCloseButton.addEventListener('click', popupClosing);
popupForm.addEventListener('submit', handleFormSubmit);