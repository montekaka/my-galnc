import React, {useEffect, useState} from "react";
import {useAtom} from 'jotai'
import { Form, Col, Row, Steps, Button, useFormApi} from '@douyinfe/semi-ui';
import ProfileForm from './ProfileForm'

const EditProfile = (props) => {
  const {id, name, short_description} = props;

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
              {props.children}
            </>
          )
        }}            
      </Form>      
    </div>
  )
}


export default EditProfile;