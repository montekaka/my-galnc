import React, {useState} from "react";
import { useAtom } from 'jotai';
import { signin} from '../jotais'
import AuthForm from './AuthForm'

const SignIn = () => {
  const [, userSignIn] = useAtom(signin);
 
  const onSubmit = (user) => {
    userSignIn(user)
  }

  return (
    <div>
      <p>Login to Your Account</p>
      <AuthForm onSubmit={onSubmit}/>
    </div>
  )
}

export default SignIn;