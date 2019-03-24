const {REACT_APP_TOKEN_LOCALSTORAGE_NAME} = process.env;

export const setToken = token => {
  if (!token) {
    return false;
  }
  window.sessionStorage.setItem(REACT_APP_TOKEN_LOCALSTORAGE_NAME, token);
};

export const getToken = () => {
  const token = window.sessionStorage.getItem(REACT_APP_TOKEN_LOCALSTORAGE_NAME);
  if (!token) {
    return false;
  }
  return token;
};

export const deleteToken = () => {
  window.sessionStorage.removeItem(REACT_APP_TOKEN_LOCALSTORAGE_NAME);
  return true;
};

export const isLoggedIn = () => {
  const token = getToken();
  if (token) {
    const payload = JSON.parse( window.atob( token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  }
  return false;
};

export default {
  setToken,
  getToken,
  deleteToken,
  isLoggedIn,
};