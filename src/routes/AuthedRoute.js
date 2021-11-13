import React, { useEffect} from "react";
import { Route, Redirect } from 'react-router-dom'
import { useAtom } from 'jotai';
import { authAtom, tryLocalSignin } from '../jotais'
import { Layout } from '@douyinfe/semi-ui';
import {HeaderMenus} from './../components'

const AuthedRoute = ({ component: Component, ...rest }) => {
  // const {state, tryLocalSignin} = useContext(AuthContext)
  const [authUser] = useAtom(authAtom);
  const [, trylocalSignIn] = useAtom(tryLocalSignin);
  const { Header, Footer, Content } = Layout;

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
        <Layout>
          <Header style={{backgroundColor: 'var(--semi-color-bg-1)'}}>
            <HeaderMenus/>
          </Header>
          <Content
            style={{
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