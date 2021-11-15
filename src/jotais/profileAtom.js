import { atom } from "jotai";
import AsyncStorage from '../libs/AsyncStorage'
import railsApi from '../apis/railsApi'
import {notificationAtom} from './notificationAtom'

export const profilesAtom = atom([]);
export const loadingProfilesAtom = atom(false);

export const fetchProfilesAtom = atom((get) => {
  return get(profilesAtom);
}, (_get, set, _) => {
  set(loadingProfilesAtom, () => {
    return true;
  })

  set(profilesAtom, async () => {
    try {
      const res = await railsApi.get('/v1/profiles');
      set(loadingProfilesAtom, () => {
        return false;
      })

      return res.data;
    } catch {
      set(loadingProfilesAtom, () => {
        return false;
      })
      
      return [];
    }
  })

})
