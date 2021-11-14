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
  
  return (
    <div>
      <h2>New Profile</h2>
      <Steps type="basic" current={currentStep}>
        {steps.map(item => (
            <Step key={item.title} title={item.title} description={item.description} />
        ))}
      </Steps> 
      <div className="steps-content" style={{ marginTop: 4, marginBottom: 4 }}>
        <ProfileForm 
          name={profile.name}
          onChange={onProfileChange}
        />
      </div>     
    </div>
  )
}

export default CreateProfile;