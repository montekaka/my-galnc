import React, {useState} from "react";
import { Button } from '@douyinfe/semi-ui';
import { useAtom } from 'jotai';
import { signup} from '../jotais'
import AuthForm from './AuthForm'

const SignUp = () => {
  const [, userSignUp] = useAtom(signup);
 
  const onSubmit = (user) => {
    userSignUp(user)
  }

  return (
    <div>
      <p>Sign up</p>
      <AuthForm onSubmit={onSubmit}>
        <Button htmlType='submit' type="tertiary" block>Sign up</Button>
      </AuthForm>
    </div>
  )
}

export default SignUp;