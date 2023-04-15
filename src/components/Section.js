export default class Section {
  constructor({ items, renderer }, conteinerSelector) {
    this._renderItems = items;
    this._renderer = renderer; // this is function
    this._conteiner = document.querySelector(conteinerSelector);
  }

  addItem(element) {
    this._conteiner.prepend(element);
  };

  renderItems() {
    this._renderItems.forEach((item)=>{
        this._renderer(item);
    });
  };

  clear() {
    this._conteiner.innerHTML = '';
  };
}