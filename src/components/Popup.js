export default class Popup {
    constructor(popupSelector){
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(this._popupSelector);
        this._closeButton = this._popupElement.querySelector('.popup__close-button');
    };

    open(){
        this._popupElement.classList.add('popup_opened');
    };

    close(){
        this._popupElement.classList.remove('popup_opened');
    };

    _handleEscClose = (evt) => {
            if (evt.key === 'Escape') {
                this.close();
            }
    };


    setEventListeners(){
        this._closeButton.addEventListener('click', () => {
            this.close();
        });
        this._popupElement.addEventListener("mousedown", (evt) => {
            if (evt.currentTarget === evt.target) {
                this.close();
            };
        });
        document.addEventListener('keydown', this._handleEscClose);
    };
}