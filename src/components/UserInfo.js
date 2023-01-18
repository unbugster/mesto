export default class UserInfo {
  constructor({ profileName, profileActivity }) {
    this._nameEl = document.querySelector(profileName);
    this._activityEl = document.querySelector(profileActivity);
  }

  getUserInfo() {
    return { profileName: this._nameEl.textContent, profileActivity: this._activityEl.textContent };
  }

  setUserInfo(data) {
    this._nameEl.textContent = data.profileName;
    this._activityEl.textContent = data.profileActivity;
  }
}
