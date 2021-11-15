import React, {useEffect, useState} from "react";
import { Form, Col, Row, Steps, Button, useFormApi} from '@douyinfe/semi-ui';
import ProfileForm from './ProfileForm'
import SocialNetworks from './SocialNetworks'

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

  useEffect(() => {
    setProfile({
      name: "Josh",
      short_description: null
    })
  }, [])

  const [socialNetworks, setSocialNetworks] = useState([]);

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

  if(profile === null) return null;

  return (
    <div>
      <h2>New Profile</h2>
      <p>{profile.name}</p>
      <Steps type="basic" current={currentStep}>
        {steps.map((item, idx) => (
            <Step key={item.title} title={item.title} description={item.description} onClick={() => {
              setCurrentStep(idx);
            }} />
        ))}
      </Steps> 
      <div className="steps-content" style={{ marginTop: 4, marginBottom: 4 }}>
        {
          currentStep === 0 && <Form
          style={{width: '100%'}}
          initValues={profile}
          >
            {({formState, values, formApi}) => { 
              return (
                <>
                  <ProfileForm/>
                  <Row type="flex" justify="center">
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Button block theme="solid" type="primary" onClick={() => {
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
                <Button block theme="solid" type="primary" onClick={nextStep}>Next</Button>      
              </Col>            
            </Row>  
          </SocialNetworks>
        }
      </div>     
    </div>
  )
}

export default CreateProfile;