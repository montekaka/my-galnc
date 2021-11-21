import React, {useEffect} from "react";
import { useAtom } from 'jotai';
import { Skeleton } from '@douyinfe/semi-ui';
import {Widget} from '../widgets'
import {initWidgetAtom, initWidgetIdxAtom, setWidgetInputValueAtom} from '../../jotais'

const style = {
  display: 'flex',
  alignItems: 'flex-start',
};

const WidgetDemo = () => {
  const [widget, setWidget] = useAtom(initWidgetAtom);
  const {user_name, url} = widget;

  const placeholder = (
    <div>
      <div>
        <Skeleton.Title style={{ width: 120, marginBottom: 12, marginTop: 12 }} />
        <Skeleton.Paragraph style={{ width: "100%" }} rows={3} />
      </div>
    </div>
  );  
  
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
      <Skeleton placeholder={placeholder} active={false}/>
    )
  }
}

export default WidgetDemo;