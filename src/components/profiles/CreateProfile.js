import React, {useState} from "react";
import { Form, Col, Row, Steps, Button } from '@douyinfe/semi-ui';
import ProfileForm from './ProfileForm'

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
    name: "Josh Chen", 
    short_description: null
  })

  const onProfileChange = (v) => {
    setProfile(v);
  }

  const nextStep = () => {
    setCurrentStep(currentStep+1);
  }
  
  return (
    <div>
      <h2>New Profile</h2>
      <Steps type="basic" current={currentStep}>
        {steps.map(item => (
            <Step key={item.title} title={item.title} description={item.description} />
        ))}
      </Steps> 
      <div className="steps-content" style={{ marginTop: 4, marginBottom: 4 }}>
        {
          currentStep === 0 && <ProfileForm 
            name={profile.name}
            onChange={onProfileChange}
            nextStep={nextStep}
          >
            <Row type="flex" justify="center">
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Button block theme="solid" type="primary" onClick={nextStep}>Next</Button>      
              </Col>
            </Row>  
          </ProfileForm>
        }

      </div>     
    </div>
  )
}

export default CreateProfile;