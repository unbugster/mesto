export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._data = data;
    this._cardTitle = data.name;
    this._cardImg = data.link;
    this._cardAlt = data.alt;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".gallery__item")
      .cloneNode(true);

    return cardElement;
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleToggleLikeCard() {
    this._likeBtn.classList.toggle("gallery__like-btn_active");
  }

  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => this._handleToggleLikeCard());
    this._removeBtn.addEventListener("click", () => this._handleDeleteCard());
    this._img.addEventListener("click", () => {
      this._handleCardClick(this._data);
    });

    this._img.addEventListener("error", (evt) => {
      const src = 'https://clck.ru/32fEE4';
      const title = 'Image not found';
      evt.onerror = null;
      this._img.src = src;
      this._img.alt = title;
      this._title.textContent = title;
      this._data.name = title;
      this._data.link = src;
    })
  }

  generateCard() {
    this._element = this._getTemplate();
    this._title = this._element.querySelector(".gallery__title");
    this._img = this._element.querySelector(".gallery__img");
    this._likeBtn = this._element.querySelector(".gallery__like-btn");
    this._removeBtn = this._element.querySelector(".gallery__remove-btn");
    this._setEventListeners();

    this._img.src = this._cardImg;
    this._img.alt = this._cardAlt || this._cardTitle;
    this._title.textContent = this._cardTitle;

    return this._element;
  }
}
