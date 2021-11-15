import React, { useEffect} from "react";
import { Route, Redirect } from 'react-router-dom'
import { useAtom } from 'jotai';
import { authAtom, tryLocalSignin, fetchProfilesAtom } from '../jotais'
import { Layout } from '@douyinfe/semi-ui';
import {HeaderMenus} from './../components'

const AuthedRoute = ({ component: Component, ...rest }) => {
  // const {state, tryLocalSignin} = useContext(AuthContext)
  const [authUser] = useAtom(authAtom);
  const [profiles, fetchProfiles] = useAtom(fetchProfilesAtom);
  const [, trylocalSignIn] = useAtom(tryLocalSignin);
  const { Header, Footer, Content } = Layout;

  // 
  // if login, then redirect to main page
  useEffect(() => {
    trylocalSignIn()
    const darkMode = localStorage.getItem('theme-mode');
    if(darkMode) {
      const body = document.body;
      body.setAttribute('theme-mode', 'dark');
    }
  }, [])

  // fetch profiles
  useEffect(() => {
    if(authUser.signedIn === true && profiles.length === 0) {
      fetchProfiles()
    }
  }, [authUser])

  if(authUser.signedIn === undefined) {
    return null;
  } else if (authUser.signedIn === true) { 
    return (
      <Route {...rest} render={(props) => (
        <Layout style={{border: 'var(--semi-color-border)', minHeight: "100vh"}}>
          <Header style={{backgroundColor: 'var(--semi-color-bg-1)'}}>
            <HeaderMenus/>
          </Header>
          <Content
            style={{
              backgroundColor: 'var(--semi-color-bg-0)',
              color: 'var(--semi-color-text-0)',
              padding: '32px'
            }}         
          >
            <Component {...props} />
          </Content>
        </Layout> 
      )}/>    
    )
  } else {
    return <Redirect to='/signin' />
  }
  // return null;  
}

export default AuthedRoute;