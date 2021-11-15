import React from "react";
import { Form, Button, InputGroup, Select, Input, Col, Row} from '@douyinfe/semi-ui';
// import { Input, InputGroup, InputNumber, Select, AutoComplete, DatePicker } from '@douyinfe/semi-ui';

const FormInput = (props) => {
  const {options, url, name, icon_name, idx, onChange, onRemoveClick} = props;

  const onClick = () => {
    onRemoveClick(idx)
  }

  const onChangeUrl = (v) => {
    onChange(idx, {url: v});
  }

  const onChangeIcon = (v) => {
    const picked = options.filter((x) => x['icon_name'] === v);
    onChange(idx, {name: picked[0]["name"], icon_name: picked[0]["icon_name"]});
  }

  if(options) {
    return (   
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Row style={{marginBottom: "20px"}}>            
            <Col xs={8} sm={8} md={8} lg={6} xl={6}><Select field="icon_name" placeholder="Link type" optionList={options} onChange={onChangeIcon} value={icon_name}/></Col>
            <Col xs={12} sm={12} md={12} lg={14} xl={14}><Input field='url' placeholder="https://..." onChange={onChangeUrl} value={url}/></Col>
            <Col xs={4} sm={4} md={4} lg={4} xl={4} style={{display: 'flex', justifyContent: 'flex-end'}}><Button type="danger" onClick={onClick}>Delete</Button></Col>                      
          </Row>
        </Col>
      </Row>    
    )
  }

  return null;
}

export default FormInput;