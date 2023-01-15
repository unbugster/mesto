import './index.css';

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";

import { initialCards } from "../utils/initialCardsData.js";
import { VALIDATION_CONFIG } from "../utils/validationConfig.js";
import {
  profileName,
  profileActivity,
  profileAddBtn,
  profileEditBtn,
  galleryListContainer,
  popupEditProfile,
  popupImgCard,
  popupAddCard,
} from "../utils/constants.js";

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
