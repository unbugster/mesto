import { initialCards } from "./cards.js";
import { enableValidation, hideInputError } from "./validate.js";

const PROFILE_NAME = document.querySelector('.profile__name');
const PROFILE_ACTIVITY = document.querySelector('.profile__activity');
const PROFILE_ADD_BTN = document.querySelector('.profile__add-btn');
const PROFILE_EDIT_BTN = document.querySelector('.profile__edit-btn');
const GALLERY_LIST_CONTAINER = document.querySelector('.gallery__list');

const POPUP_EDIT_PROFILE = document.querySelector('#edit-profile-popup');
const POPUP_EDIT_PROFILE_CLOSE_BTN = POPUP_EDIT_PROFILE.querySelector('.popup__close-btn');
const POPUP_EDIT_PROFILE_FORM = POPUP_EDIT_PROFILE.querySelector('.popup__form');
const POPUP_EDIT_PROFILE_INPUT_NAME = POPUP_EDIT_PROFILE_FORM.querySelector('.popup__input_info_name');
const POPUP_EDIT_PROFILE_INPUT_ACTIVITY = POPUP_EDIT_PROFILE_FORM.querySelector('.popup__input_info_activity');

const POPUP_IMG_CARD = document.querySelector('#img-card-popup');
const POPUP_IMG_CARD_IMAGE = POPUP_IMG_CARD.querySelector('.popup__img');
const POPUP_IMG_CARD_CAPTION = POPUP_IMG_CARD.querySelector('.popup__caption');
const POPUP_IMG_CLOSE_BTN = POPUP_IMG_CARD.querySelector('.popup__close-btn');

const POPUP_ADD_CARD = document.querySelector('#add-card-popup');
const POPUP_ADD_CARD_INPUT_NAME = POPUP_ADD_CARD.querySelector('.popup__input_info_card-name');
const POPUP_ADD_CARD_INPUT_LINK = POPUP_ADD_CARD.querySelector('.popup__input_info_card-link');
const POPUP_ADD_CARD_CLOSE_BTN = POPUP_ADD_CARD.querySelector('.popup__close-btn');
const POPUP_ADD_CARD_FORM = POPUP_ADD_CARD.querySelector('.popup__form');

const TEMPLATE_GALLERY_ITEM = document.querySelector('#gallery-item-template').content;

const VALIDATION_CONFIG = {
  formSelector: '.popup__form',
  formFieldset: '.popup__inputs-wrapper',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inputLabelSelector: '.popup__input-label',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
};

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
  POPUP_EDIT_PROFILE_INPUT_NAME.value = PROFILE_NAME.textContent;
  POPUP_EDIT_PROFILE_INPUT_ACTIVITY.value = PROFILE_ACTIVITY.textContent;
}

const getCardImgInfo = (card) => {
  POPUP_IMG_CARD_IMAGE.src = card.link;
  POPUP_IMG_CARD_IMAGE.alt = card.alt;
  POPUP_IMG_CARD_CAPTION.textContent = card.name;
}

const likesToggleHandler = (evt) => {
  evt.target.classList.toggle('gallery__like-btn_active');
}

const saveProfileChangesHandler = (evt) => {
  evt.preventDefault();
  PROFILE_NAME.textContent = POPUP_EDIT_PROFILE_INPUT_NAME.value;
  PROFILE_ACTIVITY.textContent = POPUP_EDIT_PROFILE_INPUT_ACTIVITY.value;
  closePopup(POPUP_EDIT_PROFILE);
}

const removeCardHandler = (evt) => {
  evt.target.closest('.gallery__item').remove();
}

const openImgPopupHandler = (card) => {
  getCardImgInfo(card)
  openPopup(POPUP_IMG_CARD);
}

const closePopupHandler = (evt) => {
  closePopup(evt.target.closest('.popup'));
}

const openAddCardPopupHandler = () => {
  openPopup(POPUP_ADD_CARD);
}

const openPopupProfileEditHandler = () => {
  openPopup(POPUP_EDIT_PROFILE);
  getProfileTextValues();
}

const closePopupProfileEditHandler = () => {
  hideEditProfileInputError(POPUP_EDIT_PROFILE, VALIDATION_CONFIG)
}

const closePopupWindowOverlayHandler = (evt) => {
  if (evt.target !== evt.currentTarget) {
    return;
  }

  closePopup(evt.target);
  hideEditProfileInputError(evt.currentTarget, VALIDATION_CONFIG)
}

const getCardElement = (card) => {
  const cardElement = TEMPLATE_GALLERY_ITEM.querySelector('.gallery__item').cloneNode(true);
  const title = cardElement.querySelector('.gallery__title');
  const image = cardElement.querySelector('.gallery__img');
  const likeBtn = cardElement.querySelector('.gallery__like-btn');
  const removeBtn = cardElement.querySelector('.gallery__remove-btn');

  removeBtn.addEventListener('click', removeCardHandler)
  likeBtn.addEventListener('click', likesToggleHandler);
  image.addEventListener('click', () => openImgPopupHandler(card));

  title.textContent = card.name;
  image.src = card.link;
  image.alt = card.alt || card.name;

  image.addEventListener("error", (evt) => {
    evt.target.src = "https://clck.ru/32fEE4";
    title.textContent = 'Image not found';
    evt.onerror = null;
  })

  return cardElement;
}

const renderCard = (item) => {
  const element = getCardElement(item);
  GALLERY_LIST_CONTAINER.prepend(element);
}

const renderNewCard = () => {
  let link = POPUP_ADD_CARD_INPUT_LINK.value;
  let name = POPUP_ADD_CARD_INPUT_NAME.value;

  const newCard = {
    name,
    link,
  };

  renderCard(newCard);
}

const renderCards = () => {
  initialCards.forEach((el) => renderCard(el));
}

const addNewCardSubmitHandler = (evt) => {
  evt.preventDefault();
  renderNewCard();
  POPUP_ADD_CARD_FORM.reset();
  closePopup(POPUP_ADD_CARD);
}

const hideEditProfileInputError = (profilePopupEdit, selectors) => {
  const formLabelProfileList = Array.from(profilePopupEdit.querySelectorAll(selectors.inputLabelSelector));

  formLabelProfileList.forEach((formElement) => {
    const inputProfile = formElement.querySelector(selectors.inputSelector);
    hideInputError(formElement, inputProfile, selectors);
  });
}

renderCards();
enableValidation(VALIDATION_CONFIG);

PROFILE_ADD_BTN.addEventListener('click', openAddCardPopupHandler);
PROFILE_EDIT_BTN.addEventListener('click', openPopupProfileEditHandler)

POPUP_EDIT_PROFILE_FORM.addEventListener('submit', saveProfileChangesHandler);
POPUP_EDIT_PROFILE_CLOSE_BTN.addEventListener('click', closePopupHandler)
POPUP_EDIT_PROFILE_CLOSE_BTN.addEventListener('click', closePopupProfileEditHandler)
POPUP_EDIT_PROFILE.addEventListener('click', closePopupWindowOverlayHandler);

POPUP_ADD_CARD_FORM.addEventListener('submit', addNewCardSubmitHandler)
POPUP_ADD_CARD_CLOSE_BTN.addEventListener('click', closePopupHandler)
POPUP_ADD_CARD.addEventListener('click', closePopupWindowOverlayHandler);

POPUP_IMG_CLOSE_BTN.addEventListener('click', closePopupHandler)
POPUP_IMG_CARD.addEventListener('click', closePopupWindowOverlayHandler);
