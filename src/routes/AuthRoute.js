import React, { useEffect} from "react";
import { Route, Redirect } from 'react-router-dom'
import { useAtom } from 'jotai';
import { Toast } from '@douyinfe/semi-ui';
import { authAtom, tryLocalSignin, notificationAtom, updateNotificationAtom } from '../jotais'
// It checks if the user is authenticated, if they are, redirect them to dashboard
// it renders the "component" prop. if not, then ask them to login/sign up

const AuthRoute = ({ component: Component, ...rest }) => {
  // const {state, tryLocalSignin} = useContext(AuthContext)
  const [authUser] = useAtom(authAtom);
  const [notification, setNotification] = useAtom(updateNotificationAtom)
  const [, trylocalSignIn] = useAtom(tryLocalSignin);
  // 
  // if login, then redirect to main page
  useEffect(() => {
    trylocalSignIn()
  }, [])

  useEffect(() => {
    if(notification && notification.createdTime && notification.status) {
      Toast.info(notification.message);
    }
  }, [notification.createdTime])

  if(authUser && authUser.uid && authUser.signedIn) {
    return (
      <Route {...rest} render={(props) => (
        <Redirect to='/dashboard' />
      )}/>
    )
  } else if (authUser.signedIn === false) {
    return (
      <Route {...rest} render={(props) => (
        <div className="user-auth-wrapper">
          <div style={{minWidth: '340px', display: 'flex', justifyContent: 'center'}}>
            <Component {...props} />
          </div>              
        </div>  
      )}/>    
    )
  } else {
    return null;
  }
}

export default AuthRoute;