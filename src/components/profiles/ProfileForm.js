import React from "react";
import { Form, Col, Row} from '@douyinfe/semi-ui';

const ProfileForm = ({slug}) => {  
  if(slug) {
    return (  
      <>  
        <Row type="flex" justify="center">
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Input 
              field='name' 
              label="Name"
              rules={[
                { required: true, message: 'Cannot be empty' },
            ]}        
            />
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Input 
              field='short_description' 
              label="Short description" />
          </Col>
        </Row> 
        <Row type="flex" justify="center">
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Input 
              field='slug' 
              label="User handle" />
          </Col>
        </Row>                 
      </>
      
    )
  }
  return (  
    <>  
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Input 
            field='name' 
            label="Name"
            rules={[
              { required: true, message: 'Cannot be empty' },
          ]}        
          />
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Input 
            field='short_description' 
            label="Short description" />
        </Col>
      </Row>      
    </>
    
  )
}

export default ProfileForm;