import Popup from "./Popup.js";

export default class PopupWithForms extends Popup {
    constructor({submitFunction}, popupSelector){
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._form = this._popupElement.querySelector('.popup__form');
        this._inputs = this._popupElement.querySelectorAll('.popup__input');
    };

    _getInputValues(){
        this._inputValues = {};
        this._inputs.forEach((input)=>{
            return this._inputValues[input.id] = input.value;
        })
        return this._inputValues;
    };

    setEventListeners(){
        this._form.addEventListener('submit', (evt)=>{
            evt.preventDefault();
            this._submitFunction(this._getInputValues());
        });
        super.setEventListeners();
    };

    close(){
        this._form.reset();
        super.close();
    };
}