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
  profileNameSelector,
  profileActivitySelector,
  profileAddBtn,
  profileEditBtn,
  galleryListContainerSelector,
  popupEditProfileSelector,
  popupImgCardSelector,
  popupAddCardSelector,
} from "../utils/constants.js";

const profileEditValidator = new FormValidator(VALIDATION_CONFIG, popupEditProfileSelector);
const cardAddFormValidator = new FormValidator(VALIDATION_CONFIG, popupAddCardSelector);
const userInfo = new UserInfo({ profileName: profileNameSelector, profileActivity: profileActivitySelector });
const popupWithImage = new PopupWithImage(popupImgCardSelector);

const createCard = (card) => {
  const newCard = new Card(card, "#gallery-item-template", openImgPopupHandler);
  return newCard.generateCard();
}

const profileFormPopup = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleSubmitForm: (formData) => {
    userInfo.setUserInfo(formData);
    profileFormPopup.close();
  },
});

const newCardFormPopup = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  handleSubmitForm: (formData) => {
    const card = { name: formData.cardName, link: formData.cardImgLink };
    renderInitialCards.addItem(createCard(card));
    newCardFormPopup.close();
  },
});

const openImgPopupHandler = (card) => {
  popupWithImage.open(card);
}

const renderInitialCards = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      renderInitialCards.addItem(createCard(card));
    },
  },
  galleryListContainerSelector
);

profileEditBtn.addEventListener("click", () => {
  profileFormPopup.setInputValues(userInfo.getUserInfo());
  profileEditValidator.resetValidation();
  profileFormPopup.open();
});

profileAddBtn.addEventListener("click", () => {
  cardAddFormValidator.resetValidation();
  newCardFormPopup.open();
});

profileEditValidator.enableValidation();
cardAddFormValidator.enableValidation();

profileFormPopup.setEventListeners();
newCardFormPopup.setEventListeners();
popupWithImage.setEventListeners();

renderInitialCards.renderItems();
