import { initialCards, VALIDATION_CONFIG } from "./data.js";
import { enableValidation, setButtonStateInactive, hideFormErrors } from "./validate.js";

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

const templateGalleryItem = document.querySelector('#gallery-item-template').content;
const galleryItem = templateGalleryItem.querySelector('.gallery__item');


function closeModalWindowEsc(evt) {
  const openedPopup = document.querySelector('.popup_opened')
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    closePopup(openedPopup)
  }
}

const openPopup = (popupEl) => {
  popupEl.classList.add('popup_opened');
  document.addEventListener('keydown', closeModalWindowEsc);
}

const closePopup = (popupEl) => {
  popupEl.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeModalWindowEsc);
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

const likesToggleHandler = (evt) => {
  evt.target.classList.toggle('gallery__like-btn_active');
}

const submitProfileChangesHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = popupEditProfileInputName.value;
  profileActivity.textContent = popupEditProfileInputActivity.value;
  closePopup(popupEditProfile);
}

const removeCardHandler = (evt) => {
  evt.target.closest('.gallery__item').remove();
}

const openImgPopupHandler = (card) => {
  getCardImgInfo(card)
  openPopup(popupImgCard);
}

const closePopupHandler = (evt) => {
  closePopup(evt.target.closest('.popup'));
}

const openAddCardPopupHandler = () => {
  openPopup(popupAddCard);
}

const openPopupProfileEditHandler = () => {
  openPopup(popupEditProfile);
  getProfileTextValues();
}

const closePopupProfileEditHandler = () => {
  hideFormErrors(popupEditProfile, VALIDATION_CONFIG)
}

const closePopupWindowOverlayHandler = (evt) => {
  if (evt.target !== evt.currentTarget) {
    return;
  }

  closePopup(evt.target);
  hideFormErrors(evt.currentTarget, VALIDATION_CONFIG)
}

const getCardElement = (card) => {
  const cardElement = galleryItem.cloneNode(true);
  const title = cardElement.querySelector('.gallery__title');
  const image = cardElement.querySelector('.gallery__img');
  const likeBtn = cardElement.querySelector('.gallery__like-btn');
  const removeBtn = cardElement.querySelector('.gallery__remove-btn');

  removeBtn.addEventListener('click', removeCardHandler)
  likeBtn.addEventListener('click', likesToggleHandler);

  title.textContent = card.name;
  image.src = card.link;
  image.alt = card.alt || card.name;

  image.addEventListener("error", (evt) => {
    evt.target.src = "https://clck.ru/32fEE4";
    title.textContent = 'Image not found';
    evt.onerror = null;
    card.link = evt.target.src;
    card.name = title.textContent;
  })

  image.addEventListener('click', () => openImgPopupHandler(card));
  return cardElement;
}

const renderCard = (item) => {
  const element = getCardElement(item);
  galleryListContainer.prepend(element);
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
  const submitBtn = evt.currentTarget.querySelector(".popup__save-btn");

  setButtonStateInactive(submitBtn, VALIDATION_CONFIG.inactiveButtonClass)
}



renderInitialCards();
enableValidation(VALIDATION_CONFIG);

profileAddBtn.addEventListener('click', openAddCardPopupHandler);
profileEditBtn.addEventListener('click', openPopupProfileEditHandler)

popupEditProfileForm.addEventListener('submit', submitProfileChangesHandler);
popupEditProfileCloseBtn.addEventListener('click', closePopupHandler)
popupEditProfileCloseBtn.addEventListener('click', closePopupProfileEditHandler)
popupEditProfile.addEventListener('click', closePopupWindowOverlayHandler);

popupAddCardForm.addEventListener('submit', addNewCardSubmitHandler)
popupAddCardCloseBtn.addEventListener('click', closePopupHandler)
popupAddCard.addEventListener('click', closePopupWindowOverlayHandler);

popupImgCloseBtn.addEventListener('click', closePopupHandler)
popupImgCard.addEventListener('click', closePopupWindowOverlayHandler);
