import { atom } from "jotai";

const temp = {
  createdTime: null,
  title: null,
  message: null,
  description: null,
  status: false,
  type: null
}

//    Toast.info('Submit Success');
export const notificationAtom = atom(temp);

export const updateNotificationAtom = atom((get) => {
  return get(notificationAtom);
}, (_get, set, data) => {
  const currentState = _get(notificationAtom);
  set(notificationAtom, () => {
    return {...currentState, ...data};
  })

  setTimeout(() => {
    set(notificationAtom, () => {
      return {...currentState, status: false, createdTime: new Date()};
    }) 
  }, 3000)
 
})
