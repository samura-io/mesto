import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._popupImage = this._popupElement.querySelector(".popup__image");
        this._popupCaption = this._popupElement.querySelector(".popup__caption");
    };

    open(data){
        this._popupImage.src = data.link;
        this._popupImage.alt = data.name;
        this._popupCaption.textContent = data.name;
        super.open();
    };
}