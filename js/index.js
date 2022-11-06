import { initialCards } from "./cards.js";

const PROFILE_EDIT_BTN = document.querySelector('.profile__edit-btn');
const POPUP = document.querySelector('.popup');
const POPUP_CLOSE_BTN = POPUP.querySelector('.popup__close-btn');
const POPUP_FORM = POPUP.querySelector('.popup__form');
const PROFILE_NAME = document.querySelector('.profile__name');
const PROFILE_ACTIVITY = document.querySelector('.profile__activity');
const FORM_INPUT_NAME = document.querySelector('.popup__input_info_name');
const FORM_INPUT_ACTIVITY = document.querySelector('.popup__input_info_activity');

const openPopup = () => {
  POPUP.classList.add('popup_opened');
}

const closePopup = () => {
  POPUP.classList.remove('popup_opened');
}

const getProfileTextValues = () => {
  FORM_INPUT_NAME.value = PROFILE_NAME.textContent;
  FORM_INPUT_ACTIVITY.value = PROFILE_ACTIVITY.textContent;
}

PROFILE_EDIT_BTN.addEventListener('click', () => {
  openPopup();
  getProfileTextValues();
})

POPUP_CLOSE_BTN.addEventListener('click', () => {
  closePopup();
})

const saveChanges = (evt) => {
  evt.preventDefault();
  PROFILE_NAME.textContent = FORM_INPUT_NAME.value;
  PROFILE_ACTIVITY.textContent = FORM_INPUT_ACTIVITY.value;
  closePopup();
}

POPUP_FORM.addEventListener('submit', saveChanges);

const GALLERY_ITEM_TEMPLATE = document.querySelector('#card-template').content;
const GALLERY_LIST_CONTAINER = document.querySelector('.gallery__list');

const getCardElement = (card) => {
  const cardElement = GALLERY_ITEM_TEMPLATE.querySelector('.gallery__item').cloneNode(true);
  const title = cardElement.querySelector('.gallery__title');
  const image = cardElement.querySelector('.gallery__img');
  title.textContent = card.name;
  image.src = card.link;
  image.alt = card.name;
  image.alt = card.alt;

  return cardElement;
}

const renderCard = (item) => {
  const element = getCardElement(item);
  GALLERY_LIST_CONTAINER.prepend(element);
}

initialCards.forEach(renderCard);