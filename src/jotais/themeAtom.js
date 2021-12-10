import {atom} from "jotai"
// 131C45
export const themeAtom = atom({
  primary_color: "#1B275A",
  secondary_color: "#3CD5ED",
  success_color: "#04A3D9",
  danger_color: "#131C45",
  warning_color: "#182354",
  info_color: "#FFFFFF",
  light_color: "#6E7598",
  dark_color: "#0E163B",
  font_family: "DM Sans"
})

export const updateThemeAtom = atom((get) => {
  return get(themeAtom);
}, (_get, set, data) => {
  const currentState = _get(themeAtom);
  set(themeAtom, () => {
    return {...currentState, ...data};
  })  
})

