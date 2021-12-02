import React, {useEffect, useState} from "react";
import { useAtom } from "jotai";
import { Link } from 'react-router-dom'
import { Col, Row, Button} from '@douyinfe/semi-ui';
import { WidgetsDnD} from '../components'
import {useFetchWidgets} from '../hooks'

const ProfileWidgets = (props) => {
  const id = props.match.params.id;
  const [selectedWidgets, setSelectedWidgets, loading, updateItems, widgets, setWidgets] = useFetchWidgets(id);
  // const [selectedSkills, setSelectedSkills] = useState([])
  
  const updateSkills = (skills, newTechSkills) => {
    
  }
  const handleSave = () => {
    
  }


  if(loading) return null;

  return (
    <WidgetsDnD 
      items={selectedWidgets}
      updateItem={updateSkills}
    >
      <Row type="flex" justify="center" style={{marginTop: "20px"}}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Button block type="warning" onClick={handleSave}>Save</Button>      
        </Col>                 
      </Row>  
      <Row type="flex" justify="center" style={{marginTop: "10px"}}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Link to="/" style={{ textDecoration: 'none' }}><Button block type="secondary">Cancel</Button></Link>
        </Col>                
      </Row>
    </WidgetsDnD>  
  )
}

export default ProfileWidgets;