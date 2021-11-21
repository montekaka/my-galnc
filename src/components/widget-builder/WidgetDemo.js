import React, {useEffect} from "react";
import { useAtom } from 'jotai';
import {Widget} from '../widgets'
import {initWidgetAtom, initWidgetIdxAtom, setWidgetInputValueAtom} from '../../jotais'

const WidgetDemo = () => {
  const [widget, setWidget] = useAtom(initWidgetAtom);
  const {user_name, url} = widget;
  
  if(user_name || url) {    
    return <Widget
        name={widget.name}
        widget_type={widget.widget_type}
        icon_name={widget.icon_name}
        user_name={widget.user_name}
        post_title={widget.post_title}
        post_description={widget.post_description}
        url={widget.url}
        sort_order={widget.sort_order}
        is_dynamic_content={widget.is_dynamic_content}
        image_url={widget.image_url}
        section_name={widget.section_name}
        link_type={widget.link_type}
        avatar_url={widget.avatar_url}
        show_thumbnail={widget.show_thumbnail}
      />
  } else {
    return (
      <div></div>
    )
  }
}

export default WidgetDemo;