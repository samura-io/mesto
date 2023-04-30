export default class Section {
  constructor({renderer }, conteinerSelector) {
    this._renderer = renderer;
    this._conteiner = document.querySelector(conteinerSelector);
  }

  addItem(element) {
    this._conteiner.prepend(element);
  };

  renderItems(items) {
    items.forEach((item)=>{
        this._renderer(item);
    });
  };

  clear() {
    this._conteiner.innerHTML = '';
  };
}