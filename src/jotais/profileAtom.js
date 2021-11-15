import { atom } from "jotai";
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


export const deleteProfileAtom = atom(null, (get, set, deleteId) => {

  const currentState = get(profilesAtom);
  const notiData = get(notificationAtom);

  set(profilesAtom,  () => {
    set(notificationAtom, () => {
      return {...notiData, 
        createdTime: new Date(),
        message: "Deleted profile",
        status: true,
      }
    })

    const _copy = currentState.filter((x, id) => {
      return x.id !== deleteId
    }); 

    return _copy;

    // try {
    //   const res = await railsApi.delete(`/v1/profiles/${id}`);
    //   set(notificationAtom, () => {
    //     return {...notiData, 
    //       createdTime: new Date(),
    //       message: "Deleted profile",
    //       status: true,
    //     }
    //   })

    //   const _copy = currentState.filter((x, id) => {
    //     return id !== deleteId
    //   });

    //   return _copy;
    // } catch {      
    //   set(notificationAtom, () => {
    //     return {...notiData, 
    //       createdTime: new Date(),
    //       message: "Failed to deleted profile",
    //       status: true,
    //     }
    //   })      
    //   return currentState;
    // }
  })
})