export default class Popup {
    constructor(popupSelector){
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(this._popupSelector);
        this._closeButton = this._popupElement.querySelector('.popup__close-button');
        this._saveButton = this._popupElement.querySelector('.popup__save-button');
    };

    open(){
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    };

    close(){
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
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
    };

    renderLoading(isLoading){
        if(isLoading){
            this._saveButton.textContent = 'Сохранение...';
            this._saveButton.disabled = true;
        } else {
            this._saveButton.textContent= 'Сохранить';
            this._saveButton.disabled = false;
        }
    };
}