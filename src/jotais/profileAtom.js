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

  // use promoise here so that we can by pass the suspect refresh issue
  railsApi.get('/v1/profiles')
  .then((res) => {
    set(profilesAtom, () => {
      return res.data;
    })
    set(loadingProfilesAtom, () => {
      return false;
    })    
  })
  .catch((err) => {
      set(loadingProfilesAtom, () => {
        return false;
      })
      
      return [];    
  })
})

export const createProfileAtom = atom(null, (get, set, data) => {
  const currentState = get(profilesAtom);
  const notiData = get(notificationAtom);
  const {profile, socialNetworks, techSkills} = data;

  set(profilesAtom, async () => {
    try {
      const res = await railsApi.post(`/v1/profiles`, profile)
      const id = res.data.id;
      await railsApi.post(`/v1/profiles/${id}/sync_social_networks`, {items: socialNetworks});
      await railsApi.post(`/v1/profiles/${id}/sync_tech_skills`, {items: techSkills});
  
      set(notificationAtom, () => {
        return {...notiData, 
          createdTime: new Date(),
          message: "Created profile",
          status: true,
        }
      })
  
      return [...currentState, res.data];
    } catch {
      set(notificationAtom, () => {
        return {...notiData, 
          createdTime: new Date(),
          message: "Failed to create profile",
          status: true,
        }
      })
  
      return currentState;
    }
  })
      

})


export const deleteProfileAtom = atom(null, (get, set, deleteId) => {

  const currentState = get(profilesAtom);
  const notiData = get(notificationAtom);

  set(profilesAtom, async () => {
    try {
      const res = await railsApi.delete(`/v1/profiles/${deleteId}`);
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
    } catch {      
      set(notificationAtom, () => {
        return {...notiData, 
          createdTime: new Date(),
          message: "Failed to deleted profile",
          status: true,
        }
      })      
      return currentState;
    }
  })
})