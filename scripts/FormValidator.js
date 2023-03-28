export class FormValidator {
    constructor(validationConfig, formForValidation) {
        this._validationConfig = validationConfig;
        this._formForValidation = formForValidation;
        this.inputList = Array.from(this._formForValidation.querySelectorAll(this._validationConfig.inputSelector));
        this.buttonElement = this._formForValidation.querySelector(this._validationConfig.submitButtonSelector);
    }

    // Включение валидации
    enableValidation() {
        this._setEventListeners();
    }

    // Установить слушателей
    _setEventListeners() {
        this._toggleButtonState();
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    // Активировать кнопку 
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
        } else {
            this.buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
        } 
    }

    // Вернуть решение валидности формы
    _hasInvalidInput () {
        return this.inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        }); 
    }
    
    // Принять решение валидации
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    // Активировать ошибки валидации
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formForValidation.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._validationConfig.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._validationConfig.errorClass);
    };

    // Дезактивировать ошибки валидации
    _hideInputError(inputElement) {
        const errorElement = this._formForValidation.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._validationConfig.inputErrorClass);
        errorElement.classList.remove(this._validationConfig.errorClass);
        errorElement.textContent = '';
    };
}
