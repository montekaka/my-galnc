import React from 'react';
import {useAtom} from 'jotai'
import { Dropdown, Toast, Nav, Button, Breadcrumb, Skeleton, Avatar } from '@douyinfe/semi-ui';
import { IconHome, IconHelpCircle } from '@douyinfe/semi-icons';
import {authAtom, signout} from '../../jotais'

const HeaderMenus = () => {
  const [user] = useAtom(authAtom);
  const [_, signOutUser] = useAtom(signout)

  const switchMode = () => {
    const body = document.body;
    if (body.hasAttribute('theme-mode')) {
      body.removeAttribute('theme-mode');
    } else {
      body.setAttribute('theme-mode', 'dark');
    }
  }

  return (
    <div>
      <Nav mode='horizontal' defaultSelectedKeys={['Home']}
        header={{
          logo: <img src="//lf1-cdn-tos.bytescm.com/obj/ttfe/ies/semi/webcast_logo.svg" />,
          text: 'MyGlance'
        }}      
      >
        <Nav.Item itemKey='Home' text='Home' icon={<IconHome size="large" />} />
        <Nav.Footer>  
        <Button
            theme="borderless"
            icon = {<IconHelpCircle size="large"/>}
            style={{
              color:'var(--semi-color-text-2)',
              marginRight: '12px',
            }}
            onClick={switchMode}
          />             
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
}

export default HeaderMenus;