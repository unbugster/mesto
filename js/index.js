import { initialCards, VALIDATION_CONFIG } from "./data.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";

const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const profileAddBtn = document.querySelector('.profile__add-btn');
const profileEditBtn = document.querySelector('.profile__edit-btn');
const galleryListContainer = document.querySelector('.gallery__list');
const popupEditProfile = document.querySelector('#edit-profile-popup');
const popupImgCard = document.querySelector('#img-card-popup');
const popupAddCard = document.querySelector('#add-card-popup');

const editProfileValidator = new FormValidator(VALIDATION_CONFIG, popupEditProfile);
const addCardValidator = new FormValidator(VALIDATION_CONFIG, popupAddCard);
const userInfo = new UserInfo(profileName, profileActivity);
const popupWithImage = new PopupWithImage({ popupSelector: popupImgCard });

const createCard = (card) => {
  const newCard = new Card(card, "#gallery-item-template", openImgPopupHandler);
  return newCard.generateCard();
}

const profileFormPopup = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleSubmitForm: (formData) => {
    userInfo.setUserInfo(formData);
    profileFormPopup.close();
  },
});

const newCardFormPopup = new PopupWithForm({
  popupSelector: popupAddCard,
  handleSubmitForm: (formData) => {
    const card = { name: formData.cardName, link: formData.cardLink };
    renderCard.addItem(createCard(card));
    newCardFormPopup.close();
  },
});

const openImgPopupHandler = (card) => {
  popupWithImage.open(card);
}

const renderCard = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      renderCard.addItem(createCard(card));
    },
  },
  galleryListContainer
);

const renderInitialCards = () => {
  initialCards.forEach(createCard);
}

profileEditBtn.addEventListener("click", () => {
  profileFormPopup.setInputValues(userInfo.getUserInfo());
  editProfileValidator.resetValidation();
  profileFormPopup.open();
});

profileAddBtn.addEventListener("click", () => {
  addCardValidator.resetValidation();
  newCardFormPopup.open();
});

renderInitialCards();
editProfileValidator.enableValidation();
addCardValidator.enableValidation();

profileFormPopup.setEventListeners();
newCardFormPopup.setEventListeners();
popupWithImage.setEventListeners();

renderCard.renderItems();