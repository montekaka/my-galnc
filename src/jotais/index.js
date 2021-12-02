import {themeAtom, updateThemeAtom} from './themeAtom'
import {authAtom, tryLocalSignin, signout, signin} from './authAtom'
import {notificationAtom, updateNotificationAtom} from './notificationAtom'
import {modalAtom, setModalAtom} from './modalAtom'
import {
  fetchProfilesAtom, 
  profilesAtom, 
  loadingProfilesAtom, 
  deleteProfileAtom,
  createProfileAtom,
  updateProfileAtom,
  setCurrentProfileAtom,
  currentProfileAtom
} from './profileAtom'
import {
  currentWidgetIdxAtom, 
  widgetOptionsAtom,
  widgetAtom,
  initWidgetAtom,
  initWidgetIdxAtom,
  setWidgetInputValueAtom,
  widgetInputValueAtom,
  updateWidgetFromInputAtom,
  newWidgetProfileIdAtom,
  setNewWidgetProfileIdAtom,
  updateWidgetAtom,
  resetWidgetAtom
} from './widgetAtom'

export {
  modalAtom, 
  setModalAtom,
  themeAtom,
  updateThemeAtom,
  authAtom, 
  tryLocalSignin, 
  signout, 
  signin,
  notificationAtom,
  updateNotificationAtom,
  profilesAtom, 
  loadingProfilesAtom,
  fetchProfilesAtom,
  deleteProfileAtom,
  createProfileAtom,
  updateProfileAtom,
  currentWidgetIdxAtom, 
  widgetOptionsAtom,
  widgetAtom,
  initWidgetAtom,
  initWidgetIdxAtom,
  setWidgetInputValueAtom,
  widgetInputValueAtom,
  updateWidgetFromInputAtom,
  newWidgetProfileIdAtom,
  setNewWidgetProfileIdAtom,
  updateWidgetAtom,
  setCurrentProfileAtom,
  currentProfileAtom,
  resetWidgetAtom
}