import { atom } from "jotai";
import {notificationAtom} from './notificationAtom'

export const widgetOptionsAtom = atom([
  {
    idx: 0,
    widget_type: 'tweet',
    is_dynamic_content: false,
    link_type: "general",
    icon_name: "twitter",
    name: "Pinned Tweet", 
    shortDescription: "Copy and paste your tweet link.",
    placeholder: " e.g. https://twitter.com/cogentgene/status/1461834314132381705",
    input_name: 'url'
  },
  {
    idx: 1,
    widget_type: 'github_calendar',
    is_dynamic_content: true,
    link_type: "github",
    icon_name: "github",
    name: "Github", 
    shortDescription: "Enter your Github username.",
    placeholder: "e.g. montekaka",
    // link_append: "https://github.com/",
    input_name: 'user_name'
  },
  {
    idx: 2,
    widget_type: 'list',
    is_dynamic_content: true,
    link_type: "medium",
    icon_name: "medium",
    name: "Medium Posts", 
    shortDescription: "Enter your Medium username.",
    placeholder: "e.g. @justcastapp",
    link_append: "https://medium.com/feed/",
    input_name: "user_name"
  },
  {
    idx: 3,
    widget_type: 'list',
    is_dynamic_content: true,
    link_type: "dev",
    icon_name: "dev",
    name: "Dev.to Posts", 
    shortDescription: "Enter your Dev.to username.",
    placeholder: "e.g. montekaka",
    link_append: "https://dev.to/feed/",
    input_name: "user_name"
  },  
])

export const currentWidgetIdxAtom = atom(0); // default 0

export const initWidgetIdxAtom = atom((get) => {
  return get(currentWidgetIdxAtom);
}, (_, set, id) => {
  set(currentWidgetIdxAtom, () => {
    return id;
  })
})

// id: null,
// is_dynamic_content: true, 
// widget_type: "list",
// section_name: "body",
// name: "Dev.to Posts", 
// icon_name: "dev",
// user_name: "montekaka", 
// link_type: 'dev',   
// show_thumbnail: true,
// url: "https://dev.to/feed/montekaka",
// sort_order: 3

export const widgetAtom = atom({});

export const initWidgetAtom = atom((get) => {
  return get(widgetAtom);
}, (_get, set, data) => {
  const state = _get(widgetAtom);
  set(widgetAtom, () => {
    return {...state, ...data};
  })
})

