import React, { useEffect} from "react";
import { Route, Redirect } from 'react-router-dom'
import { useAtom } from 'jotai';
import { authAtom, tryLocalSignin } from '../jotais'

const AuthedRoute = ({ component: Component, ...rest }) => {
  // const {state, tryLocalSignin} = useContext(AuthContext)
  const [authUser] = useAtom(authAtom);
  const [, trylocalSignIn] = useAtom(tryLocalSignin);

  // 
  // if login, then redirect to main page
  useEffect(() => {
    trylocalSignIn()
  }, [])


  if(authUser.signedIn === undefined) {
    return null;
  } else if (authUser.signedIn === true) { 
    return (
      <Route {...rest} render={(props) => (
        <div>
          <Component {...props} />
        </div> 
      )}/>    
    )
  } else {
    return <Redirect to='/signin' />
  }
  // return null;  
}

export default AuthedRoute;