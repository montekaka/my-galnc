import React, {useEffect} from "react";
import { useAtom } from "jotai";
import {CreateProfile, ProfileCard} from '../components'
import {fetchProfilesAtom, loadingProfilesAtom} from '../jotais'

// https://en.gravatar.com/
const Home = () => {
  const style = {
    border: '1px solid var(--semi-color-border)',
    marginBottom: 12,
    backgroundColor: 'var(--semi-color-bg-2)',
  };

  const [profiles, fetchProfiles] = useAtom(fetchProfilesAtom)
  const [loadingProfile] = useAtom(loadingProfilesAtom);

  useEffect(() => {
    fetchProfiles()
  }, [])

  if(loadingProfile === false && profiles.length === 0) return <CreateProfile/>;

  if(loadingProfile) {
    return null;
  }

  return (
    <div className="grid">
      <div style={{display: 'flex', justifyContent: 'center'}}>
      {
        profiles.map((profile) => {
          const {name, short_description, id} = profile;
          return <ProfileCard name={name} short_description={short_description} key={id} id={id}/>
        })
      }   
      </div>
    </div>
  )
}

export default Home;