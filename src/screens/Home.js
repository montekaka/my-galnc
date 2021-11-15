import { useAtom } from "jotai";
import React from "react";
import {CreateProfile, ProfileCard} from '../components'
import {profilesAtom, loadingProfilesAtom} from '../jotais'

// https://en.gravatar.com/
const Home = () => {
  const style = {
    border: '1px solid var(--semi-color-border)',
    marginBottom: 12,
    backgroundColor: 'var(--semi-color-bg-2)',
  };

  const [profiles] = useAtom(profilesAtom)
  const [loadingProfile] = useAtom(loadingProfilesAtom);

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