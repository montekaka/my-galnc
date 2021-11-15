import React from "react";
import {CreateProfile, ProfileCard} from '../components'
import {useFetchProfiles} from '../hooks'

// https://en.gravatar.com/
const Home = () => {
  const style = {
    border: '1px solid var(--semi-color-border)',
    marginBottom: 12,
    backgroundColor: 'var(--semi-color-bg-2)',
  };

  const [profiles, loadingProfile] = useFetchProfiles();

  if(loadingProfile === false && profiles.length === 0) return <CreateProfile/>;

  if(loadingProfile) {
    return null;
  }

  return (
    <div className="grid">
      {
        profiles.map((profile) => {
          const {name, short_description, id} = profile;
          return <ProfileCard name={name} short_description={short_description} key={id} id={id}/>
        })
      }      
    </div>
  )
}

export default Home;