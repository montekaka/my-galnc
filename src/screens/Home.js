import React from "react";
import {CreateProfile} from '../components'
import {useFetchProfiles} from '../hooks'

// https://en.gravatar.com/
const Home = () => {
  const [profiles, loadingProfile] = useFetchProfiles();

  if(loadingProfile === false && profiles.length === 0) return <CreateProfile/>;

  if(loadingProfile) {
    return null;
  }

  return (
    <div>
      {profiles.length}
    </div>
  )
}

export default Home;