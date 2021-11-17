import React, {useEffect, useState} from "react";
import { useAtom } from "jotai";
import { Link } from 'react-router-dom'
import { Col, Row, Button} from '@douyinfe/semi-ui';
import { TechSkillsPicker} from '../components'
import {useFetchTechSkills} from '../hooks'

const ProfileTechSkills = (props) => {
  const id = props.match.params.id;
  const [selectedSkills, setSelectedSkills, loading, updateItems, techSkills, setTechSkills] = useFetchTechSkills(id);
  // const [selectedSkills, setSelectedSkills] = useState([])

  const updateSkills = (skills, newTechSkills) => {
    const dicts = {};
    const newSkills = []

    for(let i = 0; i < techSkills.length; i++) {
      const techSkill = techSkills[i];
      const key = techSkill['icon_name'];
      dicts[key] = techSkill;
    }

    for(let i = 0; i < newTechSkills.length; i++) {
      const newTechSkill = newTechSkills[i];
      const key = newTechSkill['icon_name'];      
      if(dicts[key]) {
        const existingSkill = {...dicts[key]};
        newSkills.push(existingSkill)
      } else {
        newSkills.push(newTechSkill)
      }      
    }
    setTechSkills(newTechSkills);
    setSelectedSkills(skills);
  }
  const handleSave = () => {
    updateItems(id, techSkills);
  }


  if(loading) return null;

  return (
    <TechSkillsPicker 
      items={selectedSkills}
      updateSkills={updateSkills}
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
    </TechSkillsPicker>    
  )
}

export default ProfileTechSkills;