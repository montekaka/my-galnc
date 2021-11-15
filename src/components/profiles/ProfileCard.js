import React from "react";
import { useAtom } from "jotai"; 
import { Card, Avatar, Space, Button, Typography } from '@douyinfe/semi-ui';
import {deleteProfileAtom} from '../../jotais'

const ProfileCard = (props) => {
  const { Meta } = Card;
  const { Text } = Typography;
  const {name, short_description, id} = props;
  const [_, deleteProfile] = useAtom(deleteProfileAtom);

  return (
    <Card
      style={{ maxWidth: 340 }}
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
        <Text link>
          Edit
        </Text>
      }
      footerLine={ true }
      footerStyle={{ display: 'flex', justifyContent: 'flex-end' }}
      footer={
        <Space>          
          <Button theme='borderless' type='danger' onClick={() => {
            deleteProfile(id)
          }}>Delete</Button>
          <Button theme='solid' type='primary'>Preview</Button>
        </Space>
      }
    >
      <Space>
        <Button theme='borderless' type='primary'>Add Social Links</Button>
        <Button theme='borderless' type='primary'>Add Tech Skills</Button>        
      </Space>
    </Card>
  )
}

export default ProfileCard;