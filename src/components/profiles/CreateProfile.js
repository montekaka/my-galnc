import React, {useEffect, useState} from "react";
import {useAtom} from 'jotai'
import { Form, Col, Row, Steps, Button, useFormApi} from '@douyinfe/semi-ui';
import ProfileForm from './ProfileForm'
import SocialNetworks from './SocialNetworks'
import TechSkillsPicker from './TechSkillsPicker'
import {createProfileAtom} from '../../jotais'

const steps = [
  {
      title: 'Profile',
      description: 'Telling the world a bit about you',
  },
  {
      title: 'Links',
      description: 'Where to find you.  e.g. Linkedin, Twitter, Youtube, and etc.,',
  },
  {
      title: 'Tech Skills',
      description: 'Your tech skills, e.g. React, JavaScript, Python, and etc.,',
  },
];

const CreateProfile = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { Step } = Steps;
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false);
  const [_, createProfile] = useAtom(createProfileAtom);

  useEffect(() => {
    setProfile({
      name: null,
      short_description: null
    })
  }, [])

  const [socialNetworks, setSocialNetworks] = useState([]);
  const [techSkills, setTechSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([])

  const profileNext = (values) => {
    setProfile({...values});
    setCurrentStep(currentStep+1);
  }

  const nextStep = () => {
    setCurrentStep(currentStep+1);
  }

  const addSocialNetworkLink = (network) => {
    setSocialNetworks([...socialNetworks, network]);
  }

  const updateSocialNetworkLink = (idx, updatedData) => {
    const _copy = [...socialNetworks];
    _copy[idx] = {..._copy[idx], ...updatedData}
    setSocialNetworks(_copy)
  }

  const removeSocialNetworkLink = (deleteId) => {
    const _copy = socialNetworks.filter((x, id) => {
      return id !== deleteId
    });
    setSocialNetworks(_copy);
  }

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

    setTechSkills(newSkills)
    setSelectedSkills(skills)
  }

  const saveClick = () => {
    createProfile({
      profile,
      socialNetworks,
      techSkills
    })
  }

  if(profile === null) return null;

  return (
    <div>
      <h2>New Profile</h2>
      <Steps type="basic" current={currentStep}>
        {steps.map((item, idx) => (
            <Step key={item.title} title={item.title} description={item.description} onClick={() => {
              setCurrentStep(idx);
            }} />
        ))}
      </Steps> 
      <div className="steps-content" style={{ marginTop: 40, marginBottom: 4 }}>
        {
          currentStep === 0 && <Form
          style={{width: '100%'}}
          initValues={profile}
          >
            {({formState, values, formApi}) => { 
              return (
                <>
                  <ProfileForm/>
                  <Row type="flex" justify="center" style={{marginTop: "10px"}}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Button block type="warning" onClick={() => {
                        profileNext(values)
                      }}>Next</Button>      
                    </Col>
                  </Row>                  
                </>
              )
            }}            
          </Form>
        }
        {
          currentStep === 1 && <SocialNetworks 
            items={socialNetworks}
            addNewItem={addSocialNetworkLink}
            removeItem={removeSocialNetworkLink}
            updateItem={updateSocialNetworkLink}
          >
            <Row type="flex" justify="center">
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Button block type="warning" onClick={nextStep}>Next</Button>      
              </Col>            
            </Row>  
          </SocialNetworks>
        }
        {
          currentStep === 2 && <TechSkillsPicker 
          items={selectedSkills}
          updateSkills={updateSkills}
          >
            <Row type="flex" justify="center" style={{marginTop: '20px'}}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Button 
                  loading={loading}
                  disabled={profile.name === null ? true : false}
                  block 
                  theme="solid" 
                  type="primary" 
                  onClick={saveClick}>Save</Button>      
              </Col>            
            </Row>  
          </TechSkillsPicker>          
        }
      </div>     
    </div>
  )
}

export default CreateProfile;