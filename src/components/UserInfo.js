export default class UserInfo {
  constructor({ profileNameSelector, profileActivitySelector, profileAvatarImageSelector }) {
    this._nameEl = document.querySelector(profileNameSelector);
    this._activityEl = document.querySelector(profileActivitySelector);
    this._profileAvatarImage = document.querySelector(profileAvatarImageSelector);
  }

  getUserInfo() {
    return { name: this._nameEl.textContent, about: this._activityEl.textContent };
  }

  setUserInfo({ name, about }) {
    this._nameEl.textContent = name;
    this._activityEl.textContent = about;
  }

  setUserAvatar(avatar) {
    this._profileAvatarImage.src = avatar;
  }

  getUserId() {
    return this._userId;
  }

  makeInitialUserData({ name, about, avatar, _id }) {
    this.setUserInfo({ name, about });
    this.setUserAvatar(avatar);
    this._userId = _id;
  }
}
