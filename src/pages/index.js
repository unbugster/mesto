import "./index.css";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import Api from "../components/Api.js";

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
  deleteCardPopupSelector,
  confirmDeleteCardSelector,
  updateAvatarPopupSelector,
  profileAvatarContainer
} from "../utils/constants.js";

const profileEditValidator = new FormValidator(VALIDATION_CONFIG, popupEditProfileSelector);
const cardAddFormValidator = new FormValidator(VALIDATION_CONFIG, popupAddCardSelector);
const avatarFormValidator = new FormValidator(VALIDATION_CONFIG, updateAvatarPopupSelector);
const popupWithImage = new PopupWithImage(popupImgCardSelector);
const userInfo = new UserInfo({ profileNameSelector, profileActivitySelector, profileAvatarImageSelector });

const api = new Api(configApi);
const popupDeleteCard = new PopupWithConfirmation(deleteCardPopupSelector, confirmDeleteCardSelector);

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.makeInitialUserData(userData);
    renderInitialCards.renderItems(cards.reverse())
  })
  .catch((err) => {
    console.log("===Initial data error", err);
  });

const createCard = (card) => {
  const userId = userInfo.getUserId();
  const newCard = new Card({
    data: card,
    userId,
    templateSelector: "#gallery-item-template",
    handleCardClick: openImgPopupHandler,
    handleCardDelete: (id) => {
      popupDeleteCard.open();
      popupDeleteCard.setSubmitHandler(() => {

        api.deleteCard(id)
          .then(() => {
            newCard.handleDeleteCard();
            popupDeleteCard.close();
          })
          .catch((err) => {
            console.log("===Error in createCard", err);
          })
      })
    },
    handleCardLike: () => {
      if (newCard.isLiked()) {
        api.removeLikeCard(newCard._id)
          .then((data) => {
            newCard.removeLike();
            newCard.checkLikesCounter(data);
          })
          .catch((err) => {
            console.log("Error in removeLikeCard:", err);
          });
      } else {
        api.addLikeCard(newCard._id)
          .then((data) => {
            newCard.addLike();
            newCard.checkLikesCounter(data);
          })
          .catch((err) => {
            console.log("Error in addLikeCard:", err);
          });
      }
    }
  });

  return newCard.generateCard();
}

const profileFormPopup = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleSubmitForm: (formData) => {
    profileFormPopup.renderLoading(true);
    api.setNewProfileInfo(formData)
      .then((data) => {
        userInfo.setUserInfo(data);
        profileFormPopup.close();
      })
      .catch((err) => {
        console.log("===Error in profileForm", err);
      })
      .finally(() => {
        profileFormPopup.renderLoading(false);
      })
  },
});

const newCardFormPopup = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  handleSubmitForm: (formData) => {
    newCardFormPopup.renderLoading(true);
    api.addNewCard({ name: formData.cardName, link: formData.cardImgLink })
      .then((data) => {
        renderInitialCards.addItem(createCard(data));
        newCardFormPopup.close();
      })
      .catch((err) => {
        console.log("===Incorrect img address", err);
      })
      .finally(() => {
        newCardFormPopup.renderLoading(false);
      });
  },
});

const popupAvatar = new PopupWithForm({
  popupSelector: updateAvatarPopupSelector,
  handleSubmitForm: (formData) => {
    popupAvatar.renderLoading(true);
    api.setUserAvatar(formData.avatarLink)
      .then((data) => {
        userInfo.setUserAvatar(data.avatar);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log("===Error in popupAvatar", err);
      })
      .finally(() => {
        popupAvatar.renderLoading(false);
      })
  }
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

profileEditBtn.addEventListener('click', () => {
  profileFormPopup.setInputValues(userInfo.getUserInfo());
  profileEditValidator.resetValidation();
  profileFormPopup.open();
});

profileAddBtn.addEventListener('click', () => {
  cardAddFormValidator.resetValidation();
  newCardFormPopup.open();
});

profileAvatarContainer.addEventListener('click', () => {
  avatarFormValidator.resetValidation();
  popupAvatar.open();
})

profileEditValidator.enableValidation();
cardAddFormValidator.enableValidation();
avatarFormValidator.enableValidation();

profileFormPopup.setEventListeners();
newCardFormPopup.setEventListeners();
popupWithImage.setEventListeners();
popupDeleteCard.setEventListeners();
popupAvatar.setEventListeners();
