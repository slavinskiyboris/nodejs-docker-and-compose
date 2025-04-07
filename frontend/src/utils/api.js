import { URL } from "./constants";

const checkResponse = (res) => {
  console.log('Checking response:', res.url, res.status);
  if (res.ok || res.created) {
    return res.json().catch(err => {
      console.error('Error parsing JSON:', err);
      throw new Error('Ошибка при обработке ответа сервера');
    });
  }
  return res.json().then((err) => {
    console.error('Server error:', err);
    return Promise.reject(err);
  }).catch(err => {
    console.error('Error parsing error response:', err);
    throw new Error('Ошибка на сервере: ' + (err.message || 'неизвестная ошибка'));
  });
};
const headersWithContentType = { "Content-Type": "application/json" };
const headersWithAuthorizeFn = () => ({
  "Content-Type": "application/json",
  authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
});

export const registerUser = (userData) => {
  console.log('Registering user:', userData);
  return fetch(`${URL}/auth/signup`, {
    method: "POST",
    headers: headersWithContentType,
    body: JSON.stringify(userData),
  })
  .then(res => {
    console.log('Registration response status:', res.status);
    return checkResponse(res);
  })
  .catch(err => {
    console.error('Registration error:', err);
    if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
      throw new Error('Ошибка соединения с сервером. Пожалуйста, проверьте подключение к интернету.');
    }
    throw err;
  });
};

export const loginUser = (username, password) => {
  console.log('Logging in user:', username);
  return fetch(`${URL}/auth/signin`, {
    method: "POST",
    headers: headersWithContentType,
    body: JSON.stringify({ name: username, password }),
  })
    .then(res => {
      console.log('Login response status:', res.status);
      return checkResponse(res);
    })
    .then((data) => {
      console.log('Login successful, received token:', !!data.access_token);
      if (data.access_token) {
        sessionStorage.setItem("auth_token", data.access_token);
        return data;
      } else {
        return;
      }
    })
    .catch(err => {
      console.error('Login error:', err);
      if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
        throw new Error('Ошибка соединения с сервером. Пожалуйста, проверьте подключение к интернету.');
      }
      throw err;
    });
};

export const logoutUser = () => {
  sessionStorage.removeItem("auth_token");
};

export const refreshAndSet = (method, contextSetter) => {
  method().then(contextSetter);
};

export const getOwnUser = () => {
  return fetch(`${URL}/users/me/`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const refreshUser = (contextSetter) => {
  try {
    getOwnUser().then((user) => contextSetter(user));
  } catch (e) {
    console.error("Failed updating user");
  }
};

export const updateProfile = (user) => {
  return fetch(`${URL}/users/me/`, {
    method: "PATCH",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify(user),
  }).then(checkResponse);
};

export const getCards = (page = 1) => {
  return fetch(`${URL}/wishes/`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const getOwnWishes = () => {
  return fetch(`${URL}/users/me/wishes`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const getAnotherUserWishes = (username) => {
  return fetch(`${URL}/users/${username}/wishes`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const getAnotherUser = (username) => {
  return fetch(`${URL}/users/${username}`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const queryUser = (query) => {
  return fetch(`${URL}/users/find`, {
    method: "POST",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify({ query }),
  }).then(checkResponse);
};

export const removeWish = (id) => {
  return fetch(`${URL}/wishes/${id}`, {
    method: "DELETE",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const addOffer = (offer) => {
  return fetch(`${URL}/offers`, {
    method: "POST",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify(offer),
  }).then(checkResponse);
};

export const getTopCards = () => {
  return fetch(`${URL}/wishes/top`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const getLastCards = (page = 1) => {
  return fetch(`${URL}/wishes/last`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const getCard = (id) => {
  return fetch(`${URL}/wishes/${id}`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const createCard = (wish) => {
  return fetch(`${URL}/wishes`, {
    method: "POST",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify(wish),
  }).then(checkResponse);
};

export const updateCard = (card, id) => {
  return fetch(`${URL}/wishes/${id}`, {
    method: "PATCH",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify(card),
  }).then(checkResponse);
};

export const copyWish = (id) => {
  return fetch(`${URL}/wishes/${id}/copy`, {
    method: "POST",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const removeCard = (id) => {
  return fetch(`${URL}/wishes/${id}`, {
    method: "DELETE",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const addCollection = (data) => {
  return fetch(`${URL}/wishlistlists`, {
    method: "POST",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify(data),
  }).then(checkResponse);
};

export const getCollections = () => {
  return fetch(`${URL}/wishlistlists`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const getCollection = (id) => {
  return fetch(`${URL}/wishlistlists/${id}`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const deleteCollection = (id) => {
  return fetch(`${URL}/wishlistlists/${id}`, {
    method: "DELETE",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};
