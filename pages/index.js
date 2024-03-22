import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Zion Park",
    link: "https://images.unsplash.com/photo-1587141105209-2a7ee89bce02?q=80&w=2987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Yellowstone",
    link: "https://images.unsplash.com/photo-1581517175451-4d5d810582dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Pacific Grove",
    link: "https://images.unsplash.com/photo-1682094245632-b0fc877bd8ae?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Glacier National Park",
    link: "https://images.unsplash.com/photo-1610944092619-c88625f3348f?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Point Reyes",
    link: "https://images.unsplash.com/photo-1529380791549-da5e3bf4d91d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Tibble Fork Reservoir",
    link: "https://images.unsplash.com/photo-1455156218388-5e61b526818b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
const cardData = {
  name: "Zion Park",
  link: "https://images.unsplash.com/photo-1587141105209-2a7ee89bce02?q=80&w=2987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

// handle image preview

const handleImageClick = (cardData) => {
  console.log(cardData);
  previewImageElement.src = cardData.link;
  previewImageElement.alt = cardData.name;
  previewImageElementName.textContent = cardData.name;
  openModal(previewImageModal);
};

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// get all form elements
const forms = document.querySelectorAll(config.formSelector);

// initialize FormValidator for each form
forms.forEach((form) => {
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
});


const editButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const inputTitle = document.querySelector(".modal__input-title");
const inputSubtitle = document.querySelector(".modal__input-subtitle");
const profileCloseButton = document.querySelector(".modal__close-button");
const profileEditForm = editProfileModal.querySelector(".modal__container");
const cardList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");
const addButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#modal-add-card");
const closeAddFormButton = addCardModal.querySelector(".modal__close-button");
const addCardForm = addCardModal.querySelector("#add-card-form");
const cardName = addCardModal.querySelector(".modal__input-name");
const cardLink = addCardModal.querySelector(".modal__input-link");
const previewImageModal = document.querySelector("#modal-preview");
const closePreviewButton = previewImageModal.querySelector(
  ".modal__close-button"
);
const previewImageElement = previewImageModal.querySelector(
  ".modal__preview-image"
);
const previewImageElementName = previewImageModal.querySelector(
  ".modal__image-title"
);


// Functions

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("click", clickOutsideHandler);
  document.addEventListener("keyup", escapeKeyHandler);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("click", clickOutsideHandler);
  document.removeEventListener("keyup", escapeKeyHandler);
}

function clickOutsideHandler(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.target);
  }
}

function escapeKeyHandler(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileSubtitle.textContent = inputSubtitle.value;
  closeModal(editProfileModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardName.value;
  const link = cardLink.value;
  renderCard({ name, link });
  closeModal(addCardModal);
  addCardForm.reset();
}

// Form listeners
editButton.addEventListener("click", () => {
  inputTitle.value = profileTitle.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
  openModal(editProfileModal);
  // addCardForm.disableButton();
  // editProfileValidator.toggleButtonState <----
});
profileCloseButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});
profileEditForm.addEventListener("submit", handleProfileFormSubmit);

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

closePreviewButton.addEventListener("click", () => {
  closeModal(previewImageModal);
});

//add new card button
addButton.addEventListener("click", () => {
  openModal(addCardModal);
});

//close add form
closeAddFormButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

// create card
const createCard = (cardData) => {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.generateCard();
};

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardList.append(cardElement);
});

function renderCard(cardData) {
  console.log(2);
  console.log(cardData)
  const card = createCard(cardData);
  cardList.prepend(card);
}

