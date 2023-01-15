import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._popupImage = this._popupSelector.querySelector('.popup__img');
    this._popupImageCaption = this._popupSelector.querySelector('.popup__caption');
  }

  open(card) {
    this._popupImage.src = card.link;
    this._popupImageCaption.textContent = card.name;
    this._popupImage.alt = card.alt || card.name;

    super.open();
  }
}
