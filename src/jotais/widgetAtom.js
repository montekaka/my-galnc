import { atom } from "jotai";
import {msParserApi} from '../apis'
import {notificationAtom} from './notificationAtom'

export const newWidgetProfileIdAtom = atom('');

export const setNewWidgetProfileIdAtom = atom((get) => {
  return get(newWidgetProfileIdAtom);
}, (_get, set, newId) => {
  set(newWidgetProfileIdAtom, () =>{ 
    return newId;
  })
})

export const widgetOptionsAtom = atom([
  {
    idx: 0,
    widget_type: 'tweet',
    is_dynamic_content: false,
    link_type: "general",
    icon_name: "twitter",
    name: "Pinned Tweet", 
    shortDescription: "Copy and paste your tweet url.",
    placeholder: " e.g. https://twitter.com/cogentgene/status/1461834314132381705",
    input_name: 'url',
    endpoint: '/v1/twitter?url=',
    getRemoteData: true
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
    linkAppend: "https://github.com/",
    input_name: 'user_name'
  },
  {
    idx: 2,
    widget_type: 'rss',
    is_dynamic_content: true,
    link_type: "medium",
    icon_name: "medium",
    name: "Medium Posts", 
    shortDescription: "Enter your Medium username to show your latest 5 articles.",
    placeholder: "e.g. @justcastapp",
    linkAppend: "https://medium.com/feed/",
    input_name: "user_name"
  },
  {
    idx: 3,
    widget_type: 'rss',
    is_dynamic_content: true,
    link_type: "dev",
    icon_name: "dev",
    name: "Dev.to Posts", 
    shortDescription: "Enter your Dev.to username to show your latest 5 articles.",
    placeholder: "e.g. montekaka",
    linkAppend: "https://dev.to/feed/",
    input_name: "user_name" 
  },  
])

export const widgetInputValueAtom = atom('');

export const setWidgetInputValueAtom = atom((get) => {
  return get(widgetInputValueAtom)
}, (_get, set, data) => {
  set(widgetInputValueAtom, () =>{ 
    return data;
  })
})

export const currentWidgetIdxAtom = atom(0); // default 0

export const initWidgetIdxAtom = atom((get) => {
  return get(currentWidgetIdxAtom);
}, (_get, set, id) => {
  const options = _get(widgetOptionsAtom);
  const option = options[id];
  // const widget = _get(widgetAtom);

  const {widget_type, is_dynamic_content, link_type, icon_name, name} = option;

  set(widgetAtom, () => {
    return { widget_type, is_dynamic_content, link_type, icon_name, name};
  })

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

export const updateWidgetAtom = atom(null, (get, set, data) => {
  const state = get(widgetAtom);

  set(widgetAtom, () => {
    return {...state, ...data};
  })
})

export const initWidgetAtom = atom((get) => {
  return get(widgetAtom);
}, (_get, set, data) => {  
  const state = _get(widgetAtom);
  
  const id = _get(currentWidgetIdxAtom);
  const options = _get(widgetOptionsAtom);
  const option = options[id];

  if(data && data['user_name'] && option['linkAppend']) {
    const url = `${option['linkAppend']}${data['user_name']}`  
    set(widgetAtom, () => {
      return {...state, url, ...data};
    })      
  } else {
    set(widgetAtom, () => {
      return {...state, user_name: null,  ...data};
    })    
  }
})

export const updateWidgetFromInputAtom = atom(null, (_get, set, data) => {
  const inputStr = _get(widgetInputValueAtom);
  const widgetIdx = _get(currentWidgetIdxAtom);
  const options = _get(widgetOptionsAtom);
  const state = _get(widgetAtom);

  const option = options[widgetIdx];
  const {widget_type, is_dynamic_content, link_type, icon_name, name} = {...option};

  const updateData = {widget_type, is_dynamic_content, link_type, icon_name, name};
  if(updateData && option['input_name'] === 'url') {
    updateData['url'] = inputStr;
    updateData['user_name'] = null; 
  }

  if(option['input_name'] === 'user_name') {
    updateData['user_name'] = inputStr;
    updateData['url'] = `${option['linkAppend']}${inputStr}`;
  }

  if(!state.section_name) {
    updateData['section_name'] = 'body';
  }

  if(option['getRemoteData'] && option['endpoint']) {
    const remotePath = `${option['endpoint']}${inputStr}`
    msParserApi.get(remotePath).then((res) => {
      if(widget_type === 'tweet') {
        const {authorName, avatar, link, screenName, pubDate, tweetBody} = res.data;
        updateData['url'] = link;
        updateData['post_description'] = tweetBody;
        updateData['avatar_url'] = avatar;
        updateData['user_name'] = screenName;
        updateData['post_title'] = authorName;
        set(widgetAtom, () => {
          return {...state, ...updateData};
        });        
      }
    })
    .catch((err) => {
      set(widgetAtom, () => {
        return state;
      });
    })
  } else {
    set(widgetAtom, () => {
      return {...state, ...updateData};
    });    
  }
  
  
})

