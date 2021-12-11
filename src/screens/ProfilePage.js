import React, {useState, useEffect} from "react";
import { useAtom } from 'jotai';
import {updateThemeAtom, setNewWidgetProfileIdAtom, currentProfileAtom} from './../jotais'
import {ProfileLayout, Widget} from '../components'
import {useFetchProfile} from '../hooks'
import {ProfileCard, MyStacks} from 'glance-react-components'

const ProfilePage = (props) => {
  const id = props.match.params.id;
  const [updatedDate, setUpdatedDate] = useState(new Date());
  
  const [profile, socialNetworks, techSkills, headerWidgets, bodyWidgets, bannerWidgets, loading, errorMessage] = useFetchProfile(id, updatedDate);;
  const [themes, setThemes] = useAtom(updateThemeAtom);
  const [_, setProfileId] = useAtom(setNewWidgetProfileIdAtom);
  const [currentProfile] = useAtom(currentProfileAtom);

  useEffect(() => {
    if(profile) {
      if(profile.primary_color) {
        const {
          primary_color, secondary_color, success_color, danger_color,
          warning_color, info_color, light_color, dark_color,
          font_family
        } = profile;
  
        setThemes({primary_color, secondary_color, success_color, danger_color,
          warning_color, info_color, light_color, dark_color,
          font_family})
      }
      if(profile.id) {
        setProfileId(profile.id);
      }
    }
  }, [profile])

  useEffect(() => {
    if(currentProfile.id) {
      setUpdatedDate(currentProfile.updatedDate);
    }
  }, [currentProfile])


  if(loading) return null;
  if(errorMessage) return (<h2>{errorMessage}</h2>);
  
  if(profile) {
    
    return (
      <ProfileLayout backgroundColor={themes.danger_color}>
        <div className="gl-header">
          <ProfileCard
            title={profile.name}
            subtitle={profile.short_description}
            avatarSrc={profile.avatar_url}
            avatarSize="60"
            avatarBackgroundColor="#843CDD"
            fontFamily={themes.font_family}
            backgroundColor={themes.primary_color}
            primaryColor={themes.info_color}
            secondaryColor={themes.light_color}
            linksColor="#04D98C"
            linkColor={themes.success_color}
            link={`${process.env.REACT_APP_PROFILE_PAGE}/${profile.slug}`}
            links={socialNetworks}
          />
          <div>
            {
              headerWidgets.map((widget, idx) => {
                return (
                  <Widget
                    key={`header-pinned-${idx+1}`}
                    name={widget.name}
                    widget_type={widget.widget_type}
                    icon_name={widget.icon_name}
                    user_name={widget.user_name}
                    post_title={widget.post_title}
                    post_description={widget.post_description}
                    url={widget.url}
                    sort_order={widget.sort_order}
                    is_dynamic_content={widget.is_dynamic_content}
                    image_url={widget.image_url}
                    section_name={widget.section_name}
                    link_type={widget.link_type}
                    avatar_url={widget.avatar_url}
                    show_thumbnail={widget.show_thumbnail}                  
                  />
                )
              })
            }   
          </div>  
        </div>
        <div className="gl-body">
          <div className="side-col">
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
            {bannerWidgets.map((widget, idx) => {
              return (
                <Widget
                  key={`banner-${idx+1}`}
                  name={widget.name}
                  widget_type={widget.widget_type}
                  icon_name={widget.icon_name}
                  user_name={widget.user_name}
                  post_title={widget.post_title}
                  post_description={widget.post_description}
                  url={widget.url}
                  sort_order={widget.sort_order}
                  is_dynamic_content={widget.is_dynamic_content}
                  image_url={widget.image_url}
                  section_name={widget.section_name}
                  link_type={widget.link_type}
                  avatar_url={widget.avatar_url}
                  show_thumbnail={widget.show_thumbnail}
                />)
              }
            )}             
          </div>
          <div className="main-col">
            {bodyWidgets.map((widget, idx) => {
              return (
                <Widget
                  key={`body-${idx+1}`}
                  name={widget.name}
                  widget_type={widget.widget_type}
                  icon_name={widget.icon_name}
                  user_name={widget.user_name}
                  post_title={widget.post_title}
                  post_description={widget.post_description}
                  url={widget.url}
                  sort_order={widget.sort_order}
                  is_dynamic_content={widget.is_dynamic_content}
                  image_url={widget.image_url}
                  section_name={widget.section_name}
                  link_type={widget.link_type}
                  avatar_url={widget.avatar_url}
                  show_thumbnail={widget.show_thumbnail}
                />)
              }
            )}
          </div>
        </div>
      </ProfileLayout>  
    )
  }

  return null;
  
}

export default ProfilePage;
