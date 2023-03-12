// Включение валидации
function enableValidation(options) {
    const formList = Array.from(document.querySelectorAll(options.formSelector));
    formList.forEach(() => {
        formList.forEach((fieldSet) => {
        setEventListeners(fieldSet, options);
        });
    });
}

// Установить слушателей
function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
    const buttonElement = formElement.querySelector(options.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, options);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, options);
        toggleButtonState(inputList, buttonElement, options);
        });
    });
};

// Активировать кнопку 
function toggleButtonState(inputList, buttonElement, options) {
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(options.inactiveButtonClass);
    } else {
    buttonElement.classList.remove(options.inactiveButtonClass);
    } 
}

// Вернуть решение валидности формы
function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    }); 
}
 
// Принять решение валидации
function checkInputValidity(formElement, inputElement, options) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, options);
    } else {
        hideInputError(formElement, inputElement, options);
    }
};

// Активировать ошибки валидации
function showInputError(formElement, inputElement, errorMessage, options) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(options.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(options.errorClass);
};

// Дезактивировать ошибки валидации
function hideInputError(formElement, inputElement, options) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(options.inputErrorClass);
    errorElement.classList.remove(options.errorClass);
    errorElement.textContent = '';
};

options = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }


// Запускать валидацию при каждом открытии формы
const openButtonList = document.querySelectorAll('.profile__button')
openButtonList.forEach(function(elem){
    elem.addEventListener('click', function(){
        enableValidation(options)
    })
})
