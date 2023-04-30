import Popup from "./Popup";

export default class PopupConfirm extends Popup {
    constructor({submitFunction}, popupSelector){
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._form = this._popupElement.querySelector('.popup__form');
    };

    setEventListeners(){
        this._form.addEventListener('submit', (evt)=>{
            evt.preventDefault();
            this._submitFunction(this.card);
            this.close();
        });
        super.setEventListeners();
    };

    open(card){
        this.card = card;
        super.open();
    };
}