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

const editButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const inputTitle = document.querySelector(".modal__input-title");
const inputSubtitle = document.querySelector(".modal__input-subtitle");
const closeButton = document.querySelector(".modal__close-button");
const profileEditForm = editProfileModal.querySelector(".modal__container");
const cardList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;
const addButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#modal-add-card");
const closeAddFormButton = addCardModal.querySelector(".modal__close-button");
const addCardForm = addCardModal.querySelector("#add-card-form");
const cardName = addCardModal.querySelector(".modal__input-name");
const cardLink = addCardModal.querySelector(".modal__input-link");

// Functions
function openModal() {
  editProfileModal.classList.add("modal_opened");
}

function closeModal() {
  editProfileModal.classList.remove("modal_opened");
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


addCardForm.addEventListener("submit", handleAddCardFormSubmit);

function getCardElement(cardData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardTitleElement.textContent = cardData.name;
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  return cardElement;
}

//Form listeners
editButton.addEventListener("click", () => {
  inputTitle.value = profileTitle.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
  editProfileModal.classList.add("modal_opened");
});
closeButton.addEventListener("click", () => {
  closeModal();
});
profileEditForm.addEventListener("submit", handleProfileFormSubmit);

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

//add new card button
addButton.addEventListener("click", () => {
  addCardModal.classList.add("modal_opened");
});

//close add form
closeAddFormButton.addEventListener("click", () => {
  addCardModal.classList.remove("modal_opened");
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardList.append(cardElement);
});

// add like button feature
const likeButtons = document.querySelectorAll(".card__like-button");

likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_type_active");
  });
});

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardList.prepend(cardElement);
}
