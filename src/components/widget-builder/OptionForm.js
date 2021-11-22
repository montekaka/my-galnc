import React from "react";
import { useAtom } from 'jotai';
import { Button, Input, InputGroup, Select } from '@douyinfe/semi-ui';
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
  // const input_name = option['input_name'];
  const {user_name, url, section_name} = widget;

  const handleInputChange = (v) => {
    // setWidget({[input_name]: v})
    setWidgetInput(v);
  }

  const handleSelectChange = (section_name) => {
    setWidget({section_name})
  }

  const handleUpdatePreview = () => {
    updateWidgetFromInput();
  }
  
  return (
    <div>
      <p>{option.shortDescription}</p>
      <div style={{
        display: 'flex',
        // flexWrap: 'wrap',
        columnGap: '10px',
        rowGap: '10px'
      }}>
        <Select size="large" style={{ width: '100px'}} value={section_name ? section_name : "body"} onChange={handleSelectChange}>
          <Select.Option value='body'>Body</Select.Option>
          <Select.Option value='banner'>Banner</Select.Option>
        </Select>  
        <Input 
          size="large" 
          showClear 
          // value={widget[input_name]} 
          value={widgetInput}
          placeholder={option.placeholder}
          onChange={handleInputChange}
        />            
        <Button size="large" type="primary" theme='solid' disabled={(widgetInput === "")} onClick={handleUpdatePreview}>Test</Button>
      </div>
      
    </div>
  )
}

export default OptionForm;