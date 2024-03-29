export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseURL = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error in response: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getUserData() {
    return this._request(`${this._baseURL}/users/me`,
      {
        headers: this._headers
      })
  }

  getInitialCards() {
    return this._request(`${this._baseURL}/cards`,
      {
        headers: this._headers
      })
  }

  setNewProfileInfo({ name, about }) {
    return this._request(`${this._baseURL}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name,
          about
        })
      })
  }

  addNewCard({ name, link }) {
    return this._request(`${this._baseURL}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
  }

  deleteCard(id) {
    return this._request(`${this._baseURL}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  addLikeCard(id) {
    return this._request(`${this._baseURL}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
  }

  removeLikeCard(id) {
    return this._request(`${this._baseURL}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  setUserAvatar(avatar) {
    return this._request(`${this._baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
  }
}