class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return res.json().then((err) => {
        return Promise.reject(err);
      });
    }
    return res.json();
  }

  signUp(data) {
    return fetch(`${this._baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  createCityEntry(data) {
    return fetch(`${this._baseUrl}/cities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  logIn(data) {
    return fetch(`${this._baseUrl}/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getCityPins() {
    return fetch(`${this._baseUrl}/cities`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getMyCityPins() {
    return fetch(`${this._baseUrl}/cities/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  isAuthorised() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
}

export const authApi = new Api({
  baseUrl: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});
