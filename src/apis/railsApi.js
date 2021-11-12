import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_RAILS 
});
// token-type
export const updateHeaderCommons = ({uid, tokenType, expiry, accessToken, client}) => {
  instance.defaults.headers.common['uid'] = uid;
  instance.defaults.headers.common['token-type'] = tokenType;
  instance.defaults.headers.common['expiry'] = expiry;
  instance.defaults.headers.common['access-token'] = accessToken;
  instance.defaults.headers.common['client'] = client;
}

export const setItem = (key, value) => {
  instance.defaults.headers.common[key] = value;
}

export default instance;