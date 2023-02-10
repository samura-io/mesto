
let popupWindow = document.querySelector('.popup');

let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');

let popupFormInputs = document.querySelectorAll('.popup__input');

let profileNameText = document.querySelector('.profile__name');
let profileProfessionText = document.querySelector('.profile__profession');

let popupForm = document.querySelector('.popup__form');

function popupOpening() {
    popupWindow.classList.add('popup_opened');
    popupFormInputs[0].value = profileNameText.textContent;
    popupFormInputs[1].value = profileProfessionText.textContent;
};

function popupClosing() {
    popupWindow.classList.remove('popup_opened');
};

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileNameText.textContent = popupFormInputs[0].value;
    profileProfessionText.textContent = popupFormInputs[1].value;
    popupClosing();
}

popupOpenButton.addEventListener('click', popupOpening);
popupCloseButton.addEventListener('click', popupClosing);
popupForm.addEventListener('submit', handleFormSubmit);