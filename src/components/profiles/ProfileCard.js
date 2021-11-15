import React from "react";
import { Card, Avatar, Space, Button, Typography } from '@douyinfe/semi-ui';

const ProfileCard = (props) => {
  const { Meta } = Card;
  const { Text } = Typography;
  const {name, short_description} = props;

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
          Preview
        </Text>
      }
      footerLine={ true }
      footerStyle={{ display: 'flex', justifyContent: 'flex-end' }}
      footer={
        <Space>          
          <Button theme='solid' type='danger'>Delete</Button>
          <Button theme='borderless' type='primary'>Edit</Button>
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