import React from "react";
import { Form, Button, Toast  } from '@douyinfe/semi-ui';

const AuthForm = ({onSubmit}) => {
  const handleSubmit = (values) => {
    onSubmit(values);
  }

  return (
    <Form onSubmit={values => handleSubmit(values)} style={{width: 340}}>
        {() => (
            <>
                <Form.Input field='email' label='Email Address' style={{ width: '100%' }} placeholder='Enter your email address'></Form.Input>
                <Form.Input mode="password" field='password' label='Password' style={{ width: '100%' }} placeholder='Enter your password'></Form.Input>                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button htmlType='submit' type="tertiary" block>Log in</Button>
                </div>
            </>
        )}
    </Form>
  )
}

export default AuthForm;