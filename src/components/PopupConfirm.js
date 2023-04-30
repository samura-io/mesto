import Popup from "./Popup";

export default class PopupConfirm extends Popup {
    constructor({submitFunction}, popupSelector){
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._form = this._popupElement.querySelector('.popup__form');
        this._confirmButton = this._popupElement.querySelector('.popup__confirm-button');
    };

    setEventListeners(){
        this._form.addEventListener('submit', (evt)=>{
            evt.preventDefault();
            this._submitFunction(this.card);
        });
        super.setEventListeners();
    };

    open(card){
        this.card = card;
        super.open();
    };

    renderLoading(isLoading){
        if(isLoading){
            this._confirmButton.textContent = 'Удаление...';
            this._confirmButton.disabled = true;
        } else {
            this._confirmButton.textContent= 'Да';
            this._confirmButton.disabled = false;
        }
    };
}