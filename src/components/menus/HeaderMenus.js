import React from 'react';
import {useAtom} from 'jotai'
import { Dropdown, Toast, Nav, Button, Breadcrumb, Skeleton, Avatar } from '@douyinfe/semi-ui';
import { IconHome } from '@douyinfe/semi-icons';
import {authAtom, signout} from '../../jotais'

const HeaderMenus = () => {

  const [user] = useAtom(authAtom);
  const [_, signOutUser] = useAtom(signout)
  // const menu = [
  //   { node: 'title', name: 'Group1' },
  //   { node: 'item', name: 'primary1', type: 'primary', onClick: () => console.log('click primary') },
  //   { node: 'item', name: 'secondary', type: 'secondary' },
  //   { node: 'divider' },
  //   { node: 'title', name: 'Group2' },
  //   { node: 'item', name: 'tertiary', type: 'tertiary' },
  //   { node: 'item', name: 'warning', type: 'warning', active: true },
  //   { node: 'item', name: 'danger', type: 'danger' },
  // ];  


  return (
    <div>
      <Nav mode='horizontal' defaultSelectedKeys={['Home']}
        header={{
          logo: <img src="//lf1-cdn-tos.bytescm.com/obj/ttfe/ies/semi/webcast_logo.svg" />,
          text: 'Webcast'
        }}      
      >
        <Nav.Item itemKey='Home' text='Home' icon={<IconHome size="large" />} />
        <Nav.Footer>     
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