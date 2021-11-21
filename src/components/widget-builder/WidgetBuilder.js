import React, {useEffect} from "react";
import { useAtom } from 'jotai';
import {themeAtom} from '../../jotais'
import WidgetOptions from './WidgetOptions'
import {Widget} from '../widgets'
import {initWidgetAtom, initWidgetIdxAtom, setWidgetInputValueAtom} from '../../jotais'

const WidgetBuilder = () => {
  const [widget, setWidget] = useAtom(initWidgetAtom);
  const [__, setWidgetIdx] = useAtom(initWidgetIdxAtom);
  const [_, setWidgetInputValue] = useAtom(setWidgetInputValueAtom);

  useEffect(() => {
    setWidget();
    setWidgetIdx(0);
    setWidgetInputValue('');
  }, [])

  return (
    <div>
      <WidgetOptions>
        <p>{JSON.stringify(widget)}</p>
        <Widget
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
      </WidgetOptions>
    </div>
  )
}

export default WidgetBuilder;