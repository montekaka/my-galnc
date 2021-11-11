import React, {useState, useEffect} from "react";
import {ProfileLayout} from '../components'
import {useFetchProfile} from '../hooks'
import {ProfileCard, MyStacks} from 'glance-react-components'

const ProfilePage = (props) => {
  const id = props.match.params.id;  
  const [darkColor, profile, socialNetworks, techSkills, bodyWidgets, bannerWidgets, loading, errorMessage] = useFetchProfile(id);
  if(loading) return null;
  if(errorMessage) return (<h2>{errorMessage}</h2>);
  if(profile) {
    return (
      <ProfileLayout backgroundColor={darkColor}>
        <div className="col-1">
          <ProfileCard
            title={profile.name}
            subtitle={profile.short_description}
            avatarSrc={profile.avatar_url}
            avatarSize="100"
            avatarBackgroundColor="#843CDD"
            fontFamily={profile.font_family}
            backgroundColor={profile.primary_color}
            primaryColor={profile.info_color}
            secondaryColor={profile.light_color}
            linksColor="#04D98C"
            linkColor={profile.success_color}
            link={profile.slug}
            links={socialNetworks}
          /> 
          <MyStacks
            title="Technical Skills"
            iconName="tech-stacks"
            fontFamily={profile.font_family}
            backgroundColor={profile.primary_color}  
            headerIconStyle={{
              width: "24px",
              height: "24px",
              rectFill: profile.info_color,
              pathFill: profile.info_color
            }}
            headerStyle={{
              color: profile.light_color
            }}  
            stacksBackgroundColor="#222E66"
            stacks={techSkills}
          />                   
        </div>
      </ProfileLayout>  
    )
  }

  return null;
  
}

export default ProfilePage;
