import { initialCards } from "./cards.js";

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

const POPUP_ADD_CARD = document.querySelector('#add-card-popup');
const POPUP_ADD_CARD_INPUT_NAME = document.querySelector('.popup__input_info_card-name');
const POPUP_ADD_CARD_INPUT_LINK = document.querySelector('.popup__input_info_card-link');

const TEMPLATE_GALLERY_ITEM = document.querySelector('#gallery-item-template').content;

const openPopup = (popupEl) => {
  popupEl.classList.add('popup_opened');
}

const closePopup = (popupEl) => {
  popupEl.classList.remove('popup_opened');
}

const getPopupCloseBtn = (popup) => {
  return popup.querySelector('.popup__close-btn');
}

const getPopupForm = (popup) => {
  return popup.querySelector('.popup__form');
}

const likesToggle = (evt) => {
  evt.target.classList.toggle('gallery__like-btn_active');
}

const getProfileTextValues = () => {
  POPUP_EDIT_PROFILE_INPUT_NAME.value = PROFILE_NAME.textContent;
  POPUP_EDIT_PROFILE_INPUT_ACTIVITY.value = PROFILE_ACTIVITY.textContent;
}

const saveProfileChanges = (evt) => {
  evt.preventDefault();
  PROFILE_NAME.textContent = POPUP_EDIT_PROFILE_INPUT_NAME.value;
  PROFILE_ACTIVITY.textContent = POPUP_EDIT_PROFILE_INPUT_ACTIVITY.value;
  closePopup(POPUP_EDIT_PROFILE);
}

const removeCard = (evt) => {
  const cardId = evt.target.parentElement.dataset.id;
  initialCards.splice(cardId, 1);
  renderCards();
}

const getCardImgInfo = (card) => {
  POPUP_IMG_CARD_IMAGE.src = card.link;
  POPUP_IMG_CARD_IMAGE.alt = card.alt;
  POPUP_IMG_CARD_CAPTION.textContent = card.name;
}

const openImgPopup = (card) => {
  const closeBtn = getPopupCloseBtn(POPUP_IMG_CARD);

  closeBtn.addEventListener('click', () => {
    closePopup(POPUP_IMG_CARD);
  })

  getCardImgInfo(card)
  openPopup(POPUP_IMG_CARD);
}

const closePopupWindowOverlay = (evt) => {
  if (evt.target !== evt.currentTarget) {
    return;
  }

  closePopup(evt.target);
}

const getCardElement = (card, index) => {
  const cardElement = TEMPLATE_GALLERY_ITEM.querySelector('.gallery__item').cloneNode(true);
  cardElement.dataset.id = index;
  const title = cardElement.querySelector('.gallery__title');
  const image = cardElement.querySelector('.gallery__img');
  const like = cardElement.querySelector('.gallery__like-btn');
  const remove = cardElement.querySelector('.gallery__remove-btn');
  const img = cardElement.querySelector('.gallery__img');

  remove.addEventListener('click', removeCard)
  like.addEventListener('click', likesToggle);
  img.addEventListener('click', () => openImgPopup(card));

  title.textContent = card.name;
  image.src = card.link;
  image.alt = card.name;
  image.alt = card.alt;

  return cardElement;
}

const renderCard = (item, index) => {
  const element = getCardElement(item, index);
  GALLERY_LIST_CONTAINER.prepend(element);
}

const renderCards = () => {
  GALLERY_LIST_CONTAINER.innerHTML = '';
  initialCards.forEach((el, i) => renderCard(el, i));
}

const isValidUrl = (url) => {
  try {
    new URL(url);
  } catch (err) {
    console.error('===Некорректная ссылка на изображение', err);
    return false;
  }
  return true;
};

const renderNewCard = () => {
  let link = POPUP_ADD_CARD_INPUT_LINK.value;
  let name = POPUP_ADD_CARD_INPUT_NAME.value;

  if (!isValidUrl(link)) {
    link = "https://clck.ru/32fEE4";
    name = "Image not found";
  }

  const newCard = {
    name,
    link,
  }
  initialCards.push(newCard);
  renderCards();
}

renderCards();

PROFILE_ADD_BTN.addEventListener('click', () => {
  const closeBtn = getPopupCloseBtn(POPUP_ADD_CARD);
  const form = getPopupForm(POPUP_ADD_CARD);

  closeBtn.addEventListener('click', () => {
    closePopup(POPUP_ADD_CARD);
  })

  const submitHandler = (evt) => {
    evt.preventDefault();
    renderNewCard();
    form.reset();
    closePopup(POPUP_ADD_CARD);
    form.removeEventListener('submit', submitHandler);
  }
  form.addEventListener('submit', submitHandler)
  openPopup(POPUP_ADD_CARD);
});

POPUP_EDIT_PROFILE_FORM.addEventListener('submit', saveProfileChanges);
POPUP_EDIT_PROFILE.addEventListener('click', closePopupWindowOverlay);
POPUP_ADD_CARD.addEventListener('click', closePopupWindowOverlay);
POPUP_IMG_CARD.addEventListener('click', closePopupWindowOverlay);

PROFILE_EDIT_BTN.addEventListener('click', () => {
  openPopup(POPUP_EDIT_PROFILE);
  getProfileTextValues();
})

POPUP_EDIT_PROFILE_CLOSE_BTN.addEventListener('click', () => {
  closePopup(POPUP_EDIT_PROFILE);
})
