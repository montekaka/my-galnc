import React from "react";
import { useAtom } from 'jotai';
import { Button, Input } from '@douyinfe/semi-ui';
import {themeAtom, initWidgetAtom, currentWidgetIdxAtom, widgetOptionsAtom} from '../../jotais'

const OptionForm = (props) => {

  const [widget, setWidget] = useAtom(initWidgetAtom);
  const [currentWidgetIdx] = useAtom(currentWidgetIdxAtom);
  const [widgetOption] = useAtom(widgetOptionsAtom);

  const option = widgetOption[currentWidgetIdx];
  const input_name = option['input_name'];

  const handleInputChange = (v) => {
    setWidget({user_name: null, url: null, [input_name]: v})
  }
  
  return (
    <div>
      <p>{option.shortDescription}</p>
      <p>{option.link_append}{widget[input_name]}</p>
      <Input 
        size="large" 
        showClear 
        value={widget[input_name]} 
        placeholder={option.placeholder}
        onChange={handleInputChange}
      />
      <Button type="primary">Preview</Button>
    </div>
  )
}

export default OptionForm;