export default class FormValidator {
  constructor(config, formElementSelector) {
    this._formElement = document.querySelector(formElementSelector);
    this._config = config;
  }

  _showInputError = (inputElement) => {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._config.errorClass);
  };

  _hideInputError = (inputElement) => {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    this._errorElement.classList.remove(this._config.errorClass);
    this._errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setButtonStateActive = () => {
    this._buttonElement.removeAttribute('disabled');
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
  }

  setButtonStateInactive = () => {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.setButtonStateInactive();
    } else {
      this._setButtonStateActive();
    }
  }

  _setValidationEventListeners = () => {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState();
        this._checkInputValidity(inputElement);
      });
    });
  };

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }

  enableValidation() {
    this._setValidationEventListeners();
  }
}
