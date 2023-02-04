import './index.css';

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Api from '../components/Api.js';

import { configApi } from "../utils/configApi.js";
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
  profileAvatarImageSelector,
} from "../utils/constants.js";

const profileEditValidator = new FormValidator(VALIDATION_CONFIG, popupEditProfileSelector);
const cardAddFormValidator = new FormValidator(VALIDATION_CONFIG, popupAddCardSelector);
const userInfo = new UserInfo({ profileNameSelector, profileActivitySelector, profileAvatarImageSelector });
const popupWithImage = new PopupWithImage(popupImgCardSelector);


const api = new Api(configApi);

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.makeInitialUserData(userData);
    renderInitialCards.renderItems(cards.reverse())
  })
  .catch((err) => {
    console.log('===Initial data error', err);
  });

const createCard = (card) => {
  const newCard = new Card(card, "#gallery-item-template", openImgPopupHandler);
  return newCard.generateCard();
}

const profileFormPopup = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleSubmitForm: (formData) => {
    api.setNewProfileInfo(formData)
      .then((data) => {
        userInfo.setUserInfo(data);
        profileFormPopup.close();
      })
      .catch((err) => {
        console.log('===Error in profileForm', err);
      });
  },
});

const newCardFormPopup = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  handleSubmitForm: (formData) => {
    api.addNewCard({ name: formData.cardName, link: formData.cardImgLink })
      .then((data) => {
        const card = { name: data.name, link: data.link };
        renderInitialCards.addItem(createCard(card));
        newCardFormPopup.close();
      })
      .catch((err) => {
        console.log('===Incorrect img address', err);
      });
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
