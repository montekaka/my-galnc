import React, {useState, useEffect} from "react";
import { useAtom } from 'jotai';
import {updateThemeAtom} from './../jotais'
import {ProfileLayout} from '../components'
import {useFetchProfile} from '../hooks'
import {ProfileCard, MyStacks} from 'glance-react-components'

const ProfilePage = (props) => {
  const id = props.match.params.id;  
  const [darkColor, profile, socialNetworks, techSkills, bodyWidgets, bannerWidgets, loading, errorMessage] = useFetchProfile(id);
  const [themes, setThemes] = useAtom(updateThemeAtom);

  useEffect(() => {
    if(profile && profile.primary_color) {
      const {
        primary_color, secondary_color, success_color, danger_color,
        warning_color, info_color, light_color, dark_color,
        font_family
      } = profile;

      setThemes({primary_color, secondary_color, success_color, danger_color,
        warning_color, info_color, light_color, dark_color,
        font_family})
    }
  }, [profile])

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
            fontFamily={themes.font_family}
            backgroundColor={themes.primary_color}
            primaryColor={themes.info_color}
            secondaryColor={themes.light_color}
            linksColor="#04D98C"
            linkColor={themes.success_color}
            link={profile.slug}
            links={socialNetworks}
          /> 
          <MyStacks
            title="Technical Skills"
            iconName="tech-stacks"
            fontFamily={themes.font_family}
            backgroundColor={themes.primary_color}  
            headerIconStyle={{
              width: "24px",
              height: "24px",
              rectFill: themes.info_color,
              pathFill: themes.info_color
            }}
            headerStyle={{
              color: themes.light_color
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
