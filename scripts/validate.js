/*function showInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
  const errorMessageEl = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputElement.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, {inputErrorClass, errorClass} ) {
  const errorMessageEl = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);

}

function checkInputValidity(formElement, options, inputElement) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid);
}

function enableButton(submitButton, {inactiveButtonClass}) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function disableButton(submitButton, {inactiveButtonClass}) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}


function toggleButtonState(inputList, submitButton, {inactiveButtonClass}) {
  if(hasInvalidInput(inputList)) {
    disableButton(submitButton, {inactiveButtonClass});
    return;
  }
  enableButton(submitButton, {inactiveButtonClass});
}

function setEventListeners(formElement, options) {
  const inputList = [...formElement.querySelectorAll(options.inputSelector)];
  const submitButton = formElement.querySelector(options.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, options, inputElement);
      toggleButtonState(inputList, submitButton, options);
    })
  })
}

function enableValidation(options) {
  const formList = [...document.querySelectorAll(options.formSelector)];

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);


