export default class UserInfo {
  constructor(name, activity) {
    this._nameEl = name;
    this._activityEl = activity;
  }

  getUserInfo() {
    return { profileName: this._nameEl.textContent, profileActivity: this._activityEl.textContent };
  }

  setUserInfo(data) {
    this._nameEl.textContent = data.profileName;
    this._activityEl.textContent = data.profileActivity;
  }
}
