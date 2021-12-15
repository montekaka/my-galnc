import React, {useState} from "react";
import { Button } from '@douyinfe/semi-ui';
import { useAtom } from 'jotai';
import { signup} from '../jotais'
import AuthForm from './AuthForm'
import SignInWithTwitter from './SignInWithTwitter'

const SignUp = () => {
  const [, userSignUp] = useAtom(signup);
 
  const onSubmit = (user) => {
    userSignUp(user)
  }

  return (
    <div>
      <p>Sign up</p>
      <AuthForm onSubmit={onSubmit}>
        <Button theme="solid" type="tertiary" htmlType='submit' block>Sign up</Button>
      </AuthForm>
      <SignInWithTwitter/>
    </div>
  )
}

export default SignUp;