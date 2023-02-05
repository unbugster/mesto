import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitDeleteCardSelector) {
    super(popupSelector);
    this._confirmDeletBtn = this._popup.querySelector(submitDeleteCardSelector);
  }

  setSubmitHandler(cb) {
    this._handleDeleteCard = cb;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmDeletBtn.addEventListener('click', () => {
      this._handleDeleteCard();
    })

  }
}
