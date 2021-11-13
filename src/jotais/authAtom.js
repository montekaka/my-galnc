import { atom } from "jotai";
import AsyncStorage from '../libs/AsyncStorage'
import railsApi from '../apis/railsApi'
import {notificationAtom} from './notificationAtom'

const temp = {
  id: '',
  uid: null,  
  email: '',
  client: null,
  expiry: null,
  accessType: null,  
  accessToken: null,
  signedIn: undefined,
  type: 'waiting'
}

export const authAtom = atom(temp);

export const tryLocalSignin = atom(null, (_get, set) => {
  set(authAtom, async () => {
    AsyncStorage.updateHeaderCommons(); // load headers into apis
    try {
      const res = await railsApi.get('/auth/validate_token');
      const headers = res.headers;
      const user = res.data.data;
      AsyncStorage.setHeaderItems(headers);
      return {...temp, ...user, signedIn: true, type: 'signin'}
    } catch (err) {
      AsyncStorage.removeHeaderAuthItems()
      return {...temp, signedIn: false, type: 'signout'};
    }
  });
})

export const signin = atom(null, (get, set, tryUser) => {
  const {email, password, is_activated} = tryUser;
  const _email = email.toLowerCase();
  const notiData = get(notificationAtom);

  set(authAtom, async () => {        
    try {      
      const res = await railsApi.post('/auth/sign_in', {email: _email, password})
      const headers = res.headers;
      const user = res.data.data;
      AsyncStorage.setHeaderItems(headers);
      // Mixpanel.identify(user.id);
      // Mixpanel.track('Successful login', {email: _email});            
      // Mixpanel.people.set({$email: user.email, $is_email_invite: is_activated});

      if (user.is_activated !== true && is_activated === true) {
        // to update invite user status
        const _ = await railsApi.put('/auth', {is_activated: true})
      }
      return {...temp, ...user, signedIn: true, type: 'signin'}
            
    } catch (err) {
      console.log(err)
      AsyncStorage.removeHeaderItems()
      // Mixpanel.track('Unsuccessful login', {email: _email});      
      // const notiDataId = (notiData.id ? notiData.id : 1) + 1;      
      set(notificationAtom, () => {
        return {...notiData, 
          createdTime: new Date(),
          message: "Failed to login, please try again.",
          status: true,
        }
      })

      return {...temp, signedIn: false, type: 'add_error'};
    }
  })
})

export const signout = atom(null, (get, set, _) => {
  const user = get(authAtom);
  const {uid, client, accessToken} = user;
  
  set(authAtom, async () => {
    try {
      const res = await railsApi.delete('/auth/sign_out', {
        uid, client, 'access-token': accessToken
      })
      AsyncStorage.removeHeaderItems()
      return {...temp, signedIn: false, type: 'signout'}
    }
    catch (err) {   
      AsyncStorage.removeHeaderItems();
      return temp;
    }
  }) 
})