import React, {useState} from "react";
import { useAtom } from 'jotai';
import { signin} from '../jotais'
import AuthForm from './AuthForm'

const SignIn = () => {
  const [tryUser, setTryUser] = useState({email: "", password: ""});
  const [, userSignIn] = useAtom(signin);

  const onValuesChange = (values) => {
    const keys = Object.keys(values);
    const [name] = keys;
    const value = values[name];
    setTryUser({...tryUser, [name]: value});
  }  
  const onFinish = () => {
    userSignIn(tryUser)
  }

  return (
    <div>
      <AuthForm/>
    </div>
  )
}

export default SignIn;