import React, {useState} from "react";
import { Form, Input, Col, Row, Steps, Button } from '@douyinfe/semi-ui';

const ProfileForm = (props) => {
  const {name, short_description, onChange} = props;
  return (    
      <Form
        initValues={{name, short_description}} 
        style={{ padding: 10, width: '100%'}}        
        onValueChange={onChange}
      >
        <Row type="flex" justify="center">
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Input field='name' label="Name" trigger='blur'
              rules={[
                { required: true, message: 'Cannot be empty' },
            ]}        
            />
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Input field='short_description' label="Short description" />
          </Col>
        </Row>
        {
          props.children
        }        
      </Form>
    
  )
}

export default ProfileForm;