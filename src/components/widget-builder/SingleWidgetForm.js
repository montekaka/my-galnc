import React from "react";
import { Input, Button} from '@douyinfe/semi-ui';
import WidgetDemo from './WidgetDemo'

const SingleWidgetForm = (props) => {
  const { url, handleInputChange, handleUpdatePreview, widget} = props;

  if(widget) {
    return (
      <div>
        <h3>Your rencet project</h3>
        <div style={{
          display: 'flex',
          columnGap: '10px',
          rowGap: '10px',
          marginBottom: "40px"
        }}>
          <Input 
            size="large" 
            showClear 
            // value={widget[input_name]} 
            value={url}
            placeholder="https://www.google.com"
            onChange={handleInputChange}
          /> 
          <Button size="large" type="primary" theme='solid' disabled={(url === "")} onClick={handleUpdatePreview}>Test</Button>
        </div> 
        <WidgetDemo url={widget.url} widget={widget}/>       
      </div>
    )
  }
  
  return null;
}

export default SingleWidgetForm;