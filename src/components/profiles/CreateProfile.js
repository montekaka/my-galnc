import React, {useState} from "react";
import { Form, Col, Row, Steps, Button, ButtonGroup} from '@douyinfe/semi-ui';
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
  const [profile, setProfile] = useState({
    name: null, 
    short_description: null
  })

  const [socialNetworks, setSocialNetworks] = useState([]);

  const onProfileChange = (v) => {
    setProfile(v);
  }

  const nextStep = () => {
    setCurrentStep(currentStep+1);
  }

  const addSocialNetworkLink = (network) => {
    setSocialNetworks([...socialNetworks, network]);
  }

  const updateSocialNetworkLink = (v) => {
    const _copy = [...socialNetworks];
    const {idx, url} = v;
    _copy[idx]['url'] = url;
    setSocialNetworks(_copy)
  }

  const removeSocialNetworkLink = (deleteId) => {
    const _copy = socialNetworks.filter((x, id) => {
      return id !== deleteId
    });
    setSocialNetworks(_copy);
  }


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
      <div className="steps-content" style={{ marginTop: 4, marginBottom: 4 }}>
        {
          currentStep === 0 && <ProfileForm 
            name={profile.name}
            onChange={onProfileChange}            
          >
            <Row type="flex" justify="center">
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Button block theme="solid" type="primary" onClick={nextStep}>Next</Button>      
              </Col>
            </Row>  
          </ProfileForm>
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