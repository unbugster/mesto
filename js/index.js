import { initialCards, VALIDATION_CONFIG } from "./data.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const profileAddBtn = document.querySelector('.profile__add-btn');
const profileEditBtn = document.querySelector('.profile__edit-btn');
const galleryListContainer = document.querySelector('.gallery__list');

const popupEditProfile = document.querySelector('#edit-profile-popup');
const popupEditProfileCloseBtn = popupEditProfile.querySelector('.popup__close-btn');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const popupEditProfileInputName = popupEditProfileForm.querySelector('.popup__input_info_name');
const popupEditProfileInputActivity = popupEditProfileForm.querySelector('.popup__input_info_activity');

const popupImgCard = document.querySelector('#img-card-popup');
const popupImgCardImage = popupImgCard.querySelector('.popup__img');
const popupImgCardCaption = popupImgCard.querySelector('.popup__caption');
const popupImgCloseBtn = popupImgCard.querySelector('.popup__close-btn');

const popupAddCard = document.querySelector('#add-card-popup');
const popupAddCardInputName = popupAddCard.querySelector('.popup__input_info_card-name');
const popupAddCardInputLink = popupAddCard.querySelector('.popup__input_info_card-link');
const popupAddCardCloseBtn = popupAddCard.querySelector('.popup__close-btn');
const popupAddCardForm = popupAddCard.querySelector('.popup__form');

const editProfileValidator = new FormValidator(VALIDATION_CONFIG, popupEditProfile);
const addCardValidator = new FormValidator(VALIDATION_CONFIG, popupAddCard);

function closePopupByEsc(evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const openPopup = (popupEl) => {
  popupEl.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
  addCardValidator.resetValidation();
  addCardValidator.setButtonStateInactive();
  editProfileValidator.resetValidation();
  editProfileValidator.setButtonStateInactive();
}

const closePopup = (popupEl) => {
  popupEl.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

const getProfileTextValues = () => {
  popupEditProfileInputName.value = profileName.textContent;
  popupEditProfileInputActivity.value = profileActivity.textContent;
}

const getCardImgInfo = (card) => {
  popupImgCardImage.src = card.link;
  popupImgCardImage.alt = card.alt;
  popupImgCardCaption.textContent = card.name;
}

const submitProfileChangesHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = popupEditProfileInputName.value;
  profileActivity.textContent = popupEditProfileInputActivity.value;
  closePopup(popupEditProfile);
}

const openImgPopupHandler = (card) => {
  getCardImgInfo(card);
  openPopup(popupImgCard);
}

const closePopupHandler = (evt) => {
  closePopup(evt.target.closest('.popup'));
}

const openAddCardPopupHandler = () => {
  popupAddCardForm.reset();
  openPopup(popupAddCard);
}

const openPopupProfileEditHandler = () => {
  openPopup(popupEditProfile);
  getProfileTextValues();
}

const closePopupProfileEditHandler = () => {
  editProfileValidator.resetValidation();
}

const closePopupWindowOverlayHandler = (evt) => {
  if (evt.target !== evt.currentTarget) {
    return;
  }

  closePopup(evt.target);
}

const renderCard = (item) => {
  const newCard = new Card(item, "#gallery-item-template", openImgPopupHandler);
  galleryListContainer.prepend(newCard.generateCard());
}

const renderNewCard = () => {
  const link = popupAddCardInputLink.value;
  const name = popupAddCardInputName.value;

  const newCard = {
    name,
    link,
  };

  renderCard(newCard);
}

const renderInitialCards = () => {
  initialCards.forEach(renderCard);
}

const addNewCardSubmitHandler = (evt) => {
  evt.preventDefault();
  renderNewCard();
  popupAddCardForm.reset();
  closePopup(popupAddCard);
}

renderInitialCards();

profileAddBtn.addEventListener('click', openAddCardPopupHandler);
profileEditBtn.addEventListener('click', openPopupProfileEditHandler);

popupEditProfileForm.addEventListener('submit', submitProfileChangesHandler);
popupEditProfileCloseBtn.addEventListener('click', closePopupHandler);
popupEditProfileCloseBtn.addEventListener('click', closePopupProfileEditHandler);
popupEditProfile.addEventListener('click', closePopupWindowOverlayHandler);

popupAddCardForm.addEventListener('submit', addNewCardSubmitHandler);
popupAddCardCloseBtn.addEventListener('click', closePopupHandler);
popupAddCard.addEventListener('click', closePopupWindowOverlayHandler);

popupImgCloseBtn.addEventListener('click', closePopupHandler);
popupImgCard.addEventListener('click', closePopupWindowOverlayHandler);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
