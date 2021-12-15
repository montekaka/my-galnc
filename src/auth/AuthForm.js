import React from "react";
import { Form, Button, Toast  } from '@douyinfe/semi-ui';

const AuthForm = (props) => {
  const {onSubmit} = props;
  const handleSubmit = (values) => {
    const {email, password} = values;

    onSubmit({email: email.trim().toLowerCase(), password});
  }
// values => handleSubmit(values)
  return (
    <Form onSubmit={handleSubmit} style={{width: "340px"}}>
        {({formState, values, formApi}) => (
            <>
                <Form.Input field='email' label='Email Address' style={{ width: '100%' }} placeholder='Enter your email address'></Form.Input>
                <Form.Input mode="password" field='password' label='Password' style={{ width: '100%' }} placeholder='Enter your password'></Form.Input>                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>                  
                  {props.children}
                </div>
            </>
        )}
    </Form>
  )
}

export default AuthForm;