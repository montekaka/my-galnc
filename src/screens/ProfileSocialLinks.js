import React, {useEffect, useState} from "react";
import { useAtom } from "jotai";
import { Link } from 'react-router-dom'
import { Col, Row, Button} from '@douyinfe/semi-ui';
import { SocialNetworks} from '../components'
import {updateNotificationAtom} from '../jotais'
import {useFetchSocialNetworks} from '../hooks'

const ProfileSocialLinks = (props) => {
  const id = props.match.params.id;
  const [items, setItems, loading, updateItems] = useFetchSocialNetworks(id);

  const addSocialNetworkLink = (network) => {
    setItems([...items, network]);
  }

  const updateSocialNetworkLink = (idx, updatedData) => {
    const _copy = [...items];
    _copy[idx] = {..._copy[idx], ...updatedData}
    setItems(_copy)
  }

  const removeSocialNetworkLink = (deleteId) => {
    const _copy = items.filter((x, id) => {
      return id !== deleteId
    });
    setItems(_copy);
  }

  const handleSave = () => {
    updateItems(id, items);
  }


  if(loading) return null;

  return (
    <SocialNetworks 
      items={items}
      addNewItem={addSocialNetworkLink}
      removeItem={removeSocialNetworkLink}
      updateItem={updateSocialNetworkLink}
    >
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Button block type="warning" onClick={handleSave}>Save</Button>      
        </Col>                 
      </Row>  
      <Row type="flex" justify="center" style={{marginTop: "10px"}}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Link to="/" style={{ textDecoration: 'none' }}><Button block type="secondary">Cancel</Button></Link>
        </Col>                
      </Row>
    </SocialNetworks>    
  )
}

export default ProfileSocialLinks;