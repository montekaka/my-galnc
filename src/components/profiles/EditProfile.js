import React from "react";
import { Form, Col, Row, Steps, Button, useFormApi} from '@douyinfe/semi-ui';
import ProfileForm from './ProfileForm'

const EditProfile = (props) => {
  const {name, short_description, onClick} = props;

  return (
    <div>
      <Form
      style={{width: '100%'}}
      initValues={{
        name, short_description
      }}
      >
        {({formState, values, formApi}) => { 
          return (
            <>
              <ProfileForm/>
              <Row type="flex" justify="center" style={{marginTop: "10px"}}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Button block type="warning" onClick={() => {
                    onClick(values)
                  }}>Save</Button>      
                </Col>
              </Row>
              {props.children}
            </>
          )
        }}            
      </Form>      
    </div>
  )
}


export default EditProfile;