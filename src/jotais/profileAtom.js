import { atom } from "jotai";
import railsApi from '../apis/railsApi'
import {notificationAtom} from './notificationAtom'

export const profilesAtom = atom([]);
export const loadingProfilesAtom = atom(false);

export const currentProfileAtom = atom({id: null, updatedDate: null});
export const setCurrentProfileAtom = atom((get) => {
  return get(currentProfileAtom);
}, (_get, set, data) => {
  const state = _get(currentProfileAtom);
  set(currentProfileAtom, () => {
    return {...state, ...data};
  })
})

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
  
      setTimeout(() => {        
        set(notificationAtom, () => {
          return {...notiData, createdTime: new Date(), status: false};
        }) 
      }, 3000)
 
      return [...currentState, res.data];
    } catch {
      set(notificationAtom, () => {
        return {...notiData, 
          createdTime: new Date(),
          message: "Failed to create profile",
          status: true,
        }
      })

      setTimeout(() => {        
        set(notificationAtom, () => {
          return {...notiData, createdTime: new Date(), status: false};
        }) 
      }, 3000)      
  
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
      setTimeout(() => {        
        set(notificationAtom, () => {
          return {...notiData, createdTime: new Date(), status: false};
        }) 
      }, 3000) 
      const _copy = currentState.filter((x, id) => {
        return x.id !== deleteId
      });

      return _copy;
    } catch {      
      set(notificationAtom, () => {
        return {...notiData, 
          createdTime: new Date(),
          message: "Failed to delete profile",
          status: true,
        }
      })   
      setTimeout(() => {        
        set(notificationAtom, () => {
          return {...notiData, createdTime: new Date(), status: false};
        }) 
      }, 3000)          
      return currentState;
    }
  })
})

export const updateProfileAtom = atom(null, (get, set, data) => {
  const currentState = get(profilesAtom);
  const notiData = get(notificationAtom);
  const {id, values} = data;
  
  railsApi.put(`/v1/profiles/${id}`, values)
  .then((res) => {
    set(notificationAtom, () => {
      return {...notiData, 
        createdTime: new Date(),
        message: "Updated profile",
        status: true,
      }
    })

    setTimeout(() => {        
      set(notificationAtom, () => {        
        return {...notiData, createdTime: new Date(), status: false};
      }) 
    }, 3000)    

    set(profilesAtom, () => {
      const _copy = [...currentState];
      const idx = _copy.findIndex((x) => x.id.toString() === id);
      _copy[idx] = res.data;
  
      return _copy;
    })


  })
  .catch((err) => {
    
    set(notificationAtom, () => {
      return {...notiData, 
        createdTime: new Date(),
        message: "Failed to update profile",
        status: true,
      }
    }) 

    setTimeout(() => {        
      set(notificationAtom, () => {
        return {...notiData, createdTime: new Date(), status: false};
      }) 
    }, 3000)    
    
    set(profilesAtom, () => {  
      return currentState;
    })    
    
  })
})