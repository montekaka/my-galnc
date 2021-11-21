import React from "react";
import { useAtom } from 'jotai';
import { Button, Input } from '@douyinfe/semi-ui';
import {themeAtom, 
  currentWidgetIdxAtom, widgetOptionsAtom, 
  setWidgetInputValueAtom,initWidgetAtom,
  updateWidgetFromInputAtom
} from '../../jotais'

const OptionForm = (props) => {

  const [widget, setWidget] = useAtom(initWidgetAtom);
  const [currentWidgetIdx] = useAtom(currentWidgetIdxAtom);
  const [widgetOption] = useAtom(widgetOptionsAtom);
  const [widgetInput, setWidgetInput] = useAtom(setWidgetInputValueAtom);
  const [_, updateWidgetFromInput] = useAtom(updateWidgetFromInputAtom)

  const option = widgetOption[currentWidgetIdx];
  const input_name = option['input_name'];

  const handleInputChange = (v) => {
    // setWidget({[input_name]: v})
    setWidgetInput(v);
  }

  const handleUpdatePreview = () => {
    updateWidgetFromInput();
  }
  
  return (
    <div>
      <p>{option.shortDescription}</p>
      <p>{option.linkAppend}{widget[input_name]}</p>
      <Input 
        size="large" 
        showClear 
        // value={widget[input_name]} 
        value={widgetInput}
        placeholder={option.placeholder}
        onChange={handleInputChange}
      />
      <Button type="primary" onClick={handleUpdatePreview}>Preview</Button> 
    </div>
  )
}

export default OptionForm;