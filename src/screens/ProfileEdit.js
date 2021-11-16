import React, {useEffect, useState} from "react";
import { useAtom } from "jotai";
import {EditProfile} from '../components'
import {fetchProfilesAtom, loadingProfilesAtom} from '../jotais'

const ProfilEdit = (props) => {
  const id = props.match.params.id;  
  const [profiles, fetchProfiles] = useAtom(fetchProfilesAtom);
  const [loadingProfile] = useAtom(loadingProfilesAtom);

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if(profiles.length === 0) {
      fetchProfiles();
    }
  }, []);

  useEffect(() => {
    if(profiles.length > 0) {
      const _p = profiles.filter((p) => p.id.toString() === id);
      if(_p.length === 1) {
        setProfile(_p[0]);
      }
    }
  }, [profiles])

  if(loadingProfile) return null;

  if(profile) {
    return (
      <EditProfile 
        id={profile.id}
        name={profile.name}
        short_description={profile.short_description}
      />
    )
  }

  return null;
}

export default ProfilEdit;