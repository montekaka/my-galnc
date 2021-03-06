import React from "react";
import { useAtom } from "jotai"; 
import { Link } from 'react-router-dom'
import { Card, Avatar, Space, Button, Typography } from '@douyinfe/semi-ui';
import {deleteProfileAtom} from '../../jotais'

const ProfileCard = (props) => {
  const { Meta } = Card;
  const { Text } = Typography;
  const {name, short_description, id} = props;
  const [_, deleteProfile] = useAtom(deleteProfileAtom);

  const openPreview = () => {
    const url = `${process.env.REACT_APP_HOST}/${id}`;
    window.open(url, "_blank");
  }

  return (
    <Card
      style={{ maxWidth: 500, backgroundColor: 'var(--semi-color-fill-1)' }}
      title={
        <Meta 
          title={name}
          description={short_description}
          avatar={
            name && <Avatar color='orange' size='default'>{name[0].toUpperCase()}</Avatar>
          }
        />
      }
      headerExtraContent={
        <Link to={`/profile/${id}`} style={{ textDecoration: 'none' }}><Button theme='borderless' type='primary'>Edit</Button></Link>
      }
      footerLine={ true }
      footerStyle={{ display: 'flex', justifyContent: 'flex-end' }}
      footer={
        <Space>          
          <Button theme='borderless' type='danger' onClick={() => {
            deleteProfile(id)
          }}>Delete</Button>                
          <Link to={`/preview/${id}`} style={{ textDecoration: 'none' }}><Button theme='solid' type='primary'>Preview</Button></Link>    
        </Space>
      }
    >
      <Space>
        <Link to={`/profile/${id}/rencent-project`} style={{ textDecoration: 'none' }}>
          <Button theme='borderless' type='primary'>Recent project</Button>
        </Link>        
        <Link to={`/profile/${id}/social-links`} style={{ textDecoration: 'none' }}>
          <Button theme='borderless' type='primary'>Social Links</Button>
        </Link>
        <Link to={`/profile/${id}/tech-skills`} style={{ textDecoration: 'none' }}>
          <Button theme='borderless' type='primary'>Tech Skills</Button>        
        </Link>
        <Link to={`/profile/${id}/widgets`} style={{ textDecoration: 'none' }}>
          <Button theme='borderless' type='primary'>Widgets</Button>        
        </Link>        
      </Space>
    </Card>
  )
}

export default ProfileCard;