import React, {useState} from "react";
import { Button } from '@douyinfe/semi-ui';
import { useAtom } from 'jotai';
import { signin} from '../jotais'
import AuthForm from './AuthForm'
import SignInWithTwitter from './SignInWithTwitter'

const SignIn = () => {
  const [, userSignIn] = useAtom(signin);
 
  const onSubmit = (user) => {
    userSignIn(user)
  }

  return (
    <div>
      <p>Login to Your Account</p>
      <AuthForm onSubmit={onSubmit}>
        <Button htmlType='submit' theme="solid"  type="tertiary" block>Log in</Button>        
      </AuthForm>
      <SignInWithTwitter/>
    </div>
  )
}

export default SignIn;