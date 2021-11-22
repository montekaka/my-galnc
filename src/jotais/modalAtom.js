import { atom } from "jotai";

const temp = {
  createdTime: null,
  title: null,
  message: null,
  description: null,
  status: false,
  type: null,
  visible: false,
  fullScreen: false
}

export const modalAtom = atom(temp);

export const setModalAtom = atom((get) => {
  return get(modalAtom);
}, (_get, set, data) => {
  const currentState = _get(modalAtom);

  set(modalAtom, () => {
    return {...currentState, ...data, createdTime: new Date()};
  }) 
})