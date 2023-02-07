import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmitForm }) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector("form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._submitBtn = this._form.querySelector(".popup__save-btn");
    this._initialBtnText = this._submitBtn.textContent;
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    this._formData = {};
    this._inputList.forEach(input => this._formData[input.name] = input.value);

    return this._formData;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
    super.setEventListeners();
  }

  renderLoading(isLoading, loadingText = "Сохранение...") {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._initialBtnText;
    }
  };

  close() {
    super.close();
    this._form.reset();
  }
}
