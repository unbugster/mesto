import { initialCards } from "./cards.js";

const PROFILE_EDIT_BTN = document.querySelector('.profile__edit-btn');
const POPUP_PROFILE = document.querySelector('#edit-profile');
const POPUP_CLOSE_BTN = POPUP_PROFILE.querySelector('.popup__close-btn');
const POPUP_FORM = POPUP_PROFILE.querySelector('.popup__form');
const PROFILE_NAME = document.querySelector('.profile__name');
const PROFILE_ACTIVITY = document.querySelector('.profile__activity');
const EDIT_FORM_INPUT_NAME = document.querySelector('.popup__input_info_name');
const EDIT_FORM_INPUT_ACTIVITY = document.querySelector('.popup__input_info_activity');

const openPopup = (popupEl) => {
  popupEl.classList.add('popup_opened');
}

const closePopup = (popupEl) => {
  popupEl.classList.remove('popup_opened');
}

const getPopupCloseBtn = (popup) => {
  return popup.querySelector('.popup__close-btn');
}

const getPopupSaveBtn = (popup) => {
  return popup.querySelector('.popup__save-btn');
}

const getProfileTextValues = () => {
  EDIT_FORM_INPUT_NAME.value = PROFILE_NAME.textContent;
  EDIT_FORM_INPUT_ACTIVITY.value = PROFILE_ACTIVITY.textContent;
}

PROFILE_EDIT_BTN.addEventListener('click', () => {
  openPopup(POPUP_PROFILE);
  getProfileTextValues();
})

POPUP_CLOSE_BTN.addEventListener('click', () => {
  closePopup(POPUP_PROFILE);
})

const saveChanges = (evt) => {
  evt.preventDefault();
  PROFILE_NAME.textContent = EDIT_FORM_INPUT_NAME.value;
  PROFILE_ACTIVITY.textContent = EDIT_FORM_INPUT_ACTIVITY.value;
  closePopup(POPUP_PROFILE);
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
const renderCards = () => {
  GALLERY_LIST_CONTAINER.innerHTML = '';
  initialCards.forEach(renderCard);
}

renderCards();

const CARD_FORM_INPUT_NAME = document.querySelector('.popup__input_info_card-name');
const CARD_FORM_INPUT_LINK = document.querySelector('.popup__input_info_card-link');


const renderNewCard = () => {
  let link = CARD_FORM_INPUT_LINK.value;
  let name = CARD_FORM_INPUT_NAME.value;

  const isValidUrl = (url) => {
    try {
      new URL(url);
    } catch (e) {
      console.error('invalid url', e);
      link = "https://images.unsplash.com/photo-1609743522653-52354461eb27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
      name = "image not found";
      return false;
    }
    return true;
  };
  isValidUrl(link);

  const newCard = {
    name,
    link,
  }
  initialCards.push(newCard);

  renderCards();
}

const getPopupForm = (popup) => {
  return popup.querySelector('.popup__form');
}

const PROFILE_ADD_CARD_BTN = document.querySelector('.profile__add-btn');
const POPUP_CARD = document.querySelector('#add-card');

PROFILE_ADD_CARD_BTN.addEventListener('click', () => {
  const closeBtn = getPopupCloseBtn(POPUP_CARD);
  const form = getPopupForm(POPUP_CARD);

  closeBtn.addEventListener('click', () => {
    closePopup(POPUP_CARD);
  })

  const submitHandler = (evt) => {
    evt.preventDefault();
    renderNewCard();
    form.reset();
    closePopup(POPUP_CARD);
    form.removeEventListener('submit', submitHandler);
  }

  form.addEventListener('submit', submitHandler)

  openPopup(POPUP_CARD);
});

const closePopupWindowOverlay = (evt) => {

  if (evt.target !== evt.currentTarget) {
    return;
  }

  closePopup(evt.target);
}

POPUP_PROFILE.addEventListener('click', closePopupWindowOverlay);
POPUP_CARD.addEventListener('click', closePopupWindowOverlay);
