import React, { useEffect} from "react";
import { Route, Redirect } from 'react-router-dom'
import { useAtom } from 'jotai';
import { authAtom, tryLocalSignin, fetchProfilesAtom, notificationAtom, setModalAtom } from '../jotais'
import { Toast, Layout, Button } from '@douyinfe/semi-ui';
import {HeaderMenus, CustomModal} from './../components'
import { IconPlus} from '@douyinfe/semi-icons';

const PreviewProfileRoute = ({ component: Component, ...rest }) => {
  // const {state, tryLocalSignin} = useContext(AuthContext)
  const [authUser] = useAtom(authAtom);
  const [notification] = useAtom(notificationAtom)
  const [modal, setModal] = useAtom(setModalAtom)
  // const [profiles, fetchProfiles] = useAtom(fetchProfilesAtom);
  const [, trylocalSignIn] = useAtom(tryLocalSignin);
  const { Header, Footer, Content } = Layout;

  useEffect(() => {
    trylocalSignIn()
    const darkMode = localStorage.getItem('theme-mode');
    if(darkMode) {
      const body = document.body;
      body.setAttribute('theme-mode', 'dark');
    }
  }, [])

  // toast message
  useEffect(() => {
    if(notification && notification.createdTime && notification.status) {
      Toast.info(notification.message);
    }
  }, [notification.createdTime])  

  const handleClick = () => {
    setModal({type: 'add-widget', title: 'Add new widget', visible: true, fullScreen: true})
  }

  if(authUser.signedIn === undefined) {
    return null;
  } else if (authUser.signedIn === true) { 
    return (
      <Route {...rest} render={(props) => (
        <Layout style={{border: 'var(--semi-color-border)', minHeight: "100vh"}}>
          <CustomModal/>
          <Header style={{backgroundColor: 'var(--semi-color-bg-1)'}}>
            <HeaderMenus>
              <Button onClick={handleClick} icon={<IconPlus />} type="warning" style={{ marginRight: 20 }}>New Widget</Button>
            </HeaderMenus>
          </Header>
          <Content>
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

export default PreviewProfileRoute;