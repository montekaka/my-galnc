import {updateHeaderCommons, setItem} from '../apis/railsApi'
import queryString from 'query-string'

const AsyncStorage = {}

AsyncStorage.setHeaderItems = (headers) => {

  const accessToken = headers['access-token']
  const client = headers['client']
  const expiry = headers['expiry']
  const tokenType = headers['token-type']
  const uid = headers['uid']
  // const themeMode = headers['themeMode'];

  localStorage.setItem('access-token', accessToken)
  localStorage.setItem('client', client)
  localStorage.setItem('expiry', expiry)
  localStorage.setItem('token-type', tokenType)
  localStorage.setItem('uid', uid)
  // localStorage.setItem('theme-mode', themeMode)

  updateHeaderCommons({accessToken, client, expiry, tokenType, uid})
}

AsyncStorage.updateHeaderCommons = () => {
  const accessToken = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const expiry = localStorage.getItem('expiry')
  const tokenType = localStorage.getItem('token-type')
  const uid = localStorage.getItem('uid')

  updateHeaderCommons({accessToken, client, expiry, tokenType, uid})
}

AsyncStorage.removeHeaderItems = () => {
  const keys = Object.keys(localStorage);
  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    localStorage.removeItem(key);
  }
}

AsyncStorage.removeHeaderAuthItems = () => {
  localStorage.removeItem('access-token')
  localStorage.removeItem('client')
  localStorage.removeItem('expiry')
  localStorage.removeItem('token-type')
  localStorage.removeItem('uid')  
}

AsyncStorage.setRequestHeaderItem = (key, value) => {
  setItem(key, value)
  return {[key]: value};
}

AsyncStorage.getItem = (key) => {
  return localStorage.getItem(key)
}

AsyncStorage.setReferralCode = (pathString) => {
  const values = queryString.parse(pathString);
  const currentCode = localStorage.getItem('via');
  const currentTerm = localStorage.getItem('utm_term');

  if(!currentCode && values && values["via"]) {
    const via = values['via'];
    localStorage.setItem('via', via);
  }

  if(!currentTerm && values && values["utm_term"]) {
    const utm_term = values['utm_term'];
    localStorage.setItem('utm_term', utm_term);
  }  
}



export default AsyncStorage;