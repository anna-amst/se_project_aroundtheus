export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _enableButton() {
    const submitButton = this._form.querySelector(this._submitButtonSelector);
    submitButton.classList.remove(this._inactiveButtonClass);
    submitButton.disabled = false;
  }

  _disableButton() {
    const submitButton = this._form.querySelector(this._submitButtonSelector);
    submitButton.classList.add(this._inactiveButtonClass);
    submitButton.disabled = true;
  }

  _toggleButtonState(inputList) {
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput(inputList)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _clearFormFields() {
    const inputElements = this._form.querySelectorAll(this._inputSelector);
    inputElements.forEach((inputElement) => {
      inputElement.value = '';
    });
  }

  _isFormValid() {
    return this._form.checkValidity;
  }

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._isFormValid()) {
        this._disableButton();
        this._clearFormFields();
      }
    });
    this._setEventListeners();
  }

  resetValidation() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._disableButton();
  }
}


