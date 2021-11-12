import React, {useState} from "react";
import { Form, Button, Toast  } from '@douyinfe/semi-ui';

const AuthForm = () => {
  const handleSubmit = (values) => {
    console.log(values);
    Toast.info('Submit Success');
  }

  return (
    <Form onSubmit={values => handleSubmit(values)} style={{width: 340}}>
        {({formState, values, formApi}) => (
            <>
                <Form.Input field='email' label='Email Address' style={{ width: '100%' }} placeholder='Enter your email address'></Form.Input>
                <Form.Input mode="password" field='password' label='Password' style={{ width: '100%' }} placeholder='Enter your password'></Form.Input>                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button htmlType='submit' type="tertiary">Log in</Button>
                </div>
            </>
        )}
    </Form>
  )
}

export default AuthForm;