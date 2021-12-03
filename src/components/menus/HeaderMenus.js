import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useAtom} from 'jotai'
import { Dropdown, Toast, Nav, Button, Breadcrumb, Skeleton, Avatar } from '@douyinfe/semi-ui';
import { IconSun, IconMoon, IconHome, IconHelpCircle, IconUserAdd } from '@douyinfe/semi-icons';
import {authAtom, signout} from '../../jotais'

const HeaderMenus = (props) => {
  const [user] = useAtom(authAtom);
  const [_, signOutUser] = useAtom(signout);
  const [darkMode, setDarkMode] = useState(false);

  const switchMode = () => {
    const body = document.body;
    if (body.hasAttribute('theme-mode')) {
      body.removeAttribute('theme-mode');
      localStorage.removeItem('theme-mode');
      setDarkMode(false);
    } else {
      body.setAttribute('theme-mode', 'dark');
      localStorage.setItem('theme-mode', 'dark');
      setDarkMode(true);
    }    
  }

  useEffect(() => {
    const body = document.body;
    if(body.hasAttribute('theme-mode')) {
      setDarkMode(true);
    }
  }, []);  

  if(user && user.uid) {
    return (
      <div>
        <Nav mode='horizontal' 
          // defaultSelectedKeys={['Home']}
          header={{
            logo: <img src="//lf1-cdn-tos.bytescm.com/obj/ttfe/ies/semi/webcast_logo.svg" />,
            text: 'MyGlance'
          }}      
        >
          <Link to="/" style={{ textDecoration: 'none' }}><Nav.Item itemKey='home' text='Home' icon={<IconHome size="large" />} /></Link>
          {/* <Link to="/new-profile" style={{ textDecoration: 'none' }}><Nav.Item itemKey='newprofile' text='New Profile' icon={<IconUserAdd size="large" />} /></Link> */}
          <Nav.Footer>
            <Button
              theme="borderless"
              icon = {darkMode ? <IconSun size="large"/> : <IconMoon size="large"/>}
              style={{
                color:'var(--semi-color-text-2)',
                marginRight: '12px',
              }}
              onClick={switchMode}
            />
            {props.children}
            <Dropdown
              trigger={'click'}
              showTick
              position={'bottomLeft'}
              clickToHide={true}
              render={
                <Dropdown.Menu>
                    <Dropdown.Title>{user.email}</Dropdown.Title>                
                    <Dropdown.Item type="secondary" onClick={() => {
                      signOutUser()
                    }}>Sign out</Dropdown.Item>
                </Dropdown.Menu>
              }
            >                 
              <Avatar color='orange' size='small'>{user.email[0].toUpperCase()}</Avatar>
            </Dropdown>          
          </Nav.Footer>
        </Nav>
      </div>
    )

    return null;
  } 

  
}

export default HeaderMenus;