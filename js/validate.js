const showInputError = (formElement, inputElement, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(selectors.errorClass);
};

const hideInputError = (formElement, inputElement, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = '';
};

const setButtonStateActive = (buttonElement, className) => {
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove(className);
}

const setButtonStateInactive = (buttonElement, className) => {
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(className);
}

const hideFormErrors = (form, selectors) => {
  const formLabelProfileList = Array.from(form.querySelectorAll(selectors.inputLabelSelector));

  formLabelProfileList.forEach((formElement) => {
    const inputProfile = formElement.querySelector(selectors.inputSelector);
    hideInputError(formElement, inputProfile, selectors);
  });
}

const toggleButtonState = (inputList, buttonElement, selectors) => {
  if (hasInvalidInput(inputList)) {
    setButtonStateInactive(buttonElement, selectors.inactiveButtonClass);
  } else {
    setButtonStateActive(buttonElement, selectors.inactiveButtonClass);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const checkInputValidity = (formElement, inputElement, selectors) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, selectors);
  } else {
    hideInputError(formElement, inputElement, selectors);
  }
};

const setEventListeners = (formElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, selectors);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleButtonState(inputList, buttonElement, selectors);
      checkInputValidity(formElement, inputElement, selectors);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const fieldsetList = Array.from(formElement.querySelectorAll(config.formFieldset));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, config);
    });
  });
};

export { enableValidation, setButtonStateInactive, hideFormErrors };