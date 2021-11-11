import React, {useState, useEffect} from "react";
import {ProfileLayout} from '../components'
import {useFetchProfile} from '../hooks'

const ProfilePage = (props) => {
  const id = props.match.params.id;  
  const [darkColor, profile, socialNetworks, techSkills, bodyWidgets, bannerWidgets, loading, errorMessage] = useFetchProfile(id);
  if(loading) return null;

  return (
    <ProfileLayout backgroundColor={darkColor}>
    </ProfileLayout>  
  )
}

export default ProfilePage;
