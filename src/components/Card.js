export default class Card {
  constructor({ data, userId, templateSelector, handleCardClick, handleCardDelete, handleCardLike }) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._owner = data.owner;
    this._id = data._id;
    this._userId = userId;
    this._likes = data.likes || [];
    this._cardTitle = data.name;
    this._cardImgLink = data.link;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".gallery__item")
      .cloneNode(true);

    return cardElement;
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _isCardOwner() {
    if (this._owner) {
      return this._owner._id === this._userId;
    }
    return true;
  }

  _showDeleteButton() {
    if (!this._isCardOwner()) {
      this._removeBtn.remove();
      this._removeBtn = null;
    }
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => this._handleCardLike(this));
    this._removeBtn.addEventListener('click', () => this._handleCardDelete(this._id));
    this._img.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });

    this._img.addEventListener("error", (evt) => {
      const src = "https://clck.ru/32fEE4";
      const title = "Image not found";
      evt.onerror = null;
      this._img.src = src;
      this._img.alt = title;
      this._title.textContent = title;
      this._data.name = title;
      this._data.link = src;
    })
  }

  checkLikesCounter(data) {
    this._likesCounter.textContent = data.likes.length || "";
  }

  isLiked() {
    return this._likeBtn.classList.contains("gallery__like-btn_active");
  }

  addLike() {
    this._likeBtn.classList.add("gallery__like-btn_active");
  }

  removeLike() {
    this._likeBtn.classList.remove("gallery__like-btn_active");
  }

  _toggleLikes() {
    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this.addLike();
      }
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._title = this._element.querySelector(".gallery__title");
    this._img = this._element.querySelector(".gallery__img");
    this._likeBtn = this._element.querySelector(".gallery__like-btn");
    this._removeBtn = this._element.querySelector(".gallery__remove-btn");
    this._likesCounter = this._element.querySelector(".gallery__like-counter");
    this._likesCounter.textContent = this._likes.length || "";

    this._toggleLikes();
    this._setEventListeners();
    this._showDeleteButton();
    this._img.src = this._cardImgLink;
    this._img.alt = this._cardTitle;
    this._title.textContent = this._cardTitle;

    return this._element;
  }
}
