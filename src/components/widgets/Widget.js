import React from "react";
import { useAtom } from 'jotai';
import {themeAtom} from '../../jotais'
import {
  GithubCalendarCard,
  ProfileCard, SinglePost, 
  TweetCard, RecentPosts, MyStacks
} from 'glance-react-components'
import RssFeedWidget from './RssFeedWidget'

const Widget = (props) => {
  const {name, widget_type, icon_name, post_title, post_description, url, is_dynamic_content, sort_order, image_url, user_name, link_type, avatar_url, show_thumbnail} = props;
  const [theme] = useAtom(themeAtom);
  const { primary_color, secondary_color, success_color, danger_color,
    warning_color, info_color, light_color, dark_color,
    font_family} = theme;

  if(widget_type === 'github_calendar') {
    return (
      <GithubCalendarCard
          title={name}
          iconName={icon_name}
          username={user_name}
          backgroundColor={primary_color}
          cardBackgroundColor={danger_color}
          linkColor={light_color}
          linkBackgroundColor={warning_color}
          fontFamily={font_family}
          headerIconStyle={{
            width: "24px",
            height: "24px",
            rectFill: info_color,
            pathFill: info_color
          }}
          headerStyle={{
            color: light_color
          }}   
          colors={["#131C45","#BBE3D5","#006d32","#26a641","#39d353"]}
      />      
    )
  } else if (widget_type === 'tweet') {
    return (
      <TweetCard 
        title={name}
        iconName={icon_name}
        tweetBody={post_description}
        screenName={`@${user_name}`}
        authorName={post_title}
        avatar={avatar_url}
        // likes="16"
        // pubDate="2021-10-19T05:43:01+0000"
        link={url}
        backgroundColor={primary_color}
        cardBackgroundColor={danger_color}
        avatarBackgroundColor="#553BFF"
        fontFamily={font_family}
        headerIconStyle={{
          width: "24px",
          height: "24px",
          rectFill: secondary_color,
          pathFill: "#1DA1F2"
        }}
        headerStyle={{
          color: light_color
        }}
        primaryTextColor={info_color}
        secondaryTextColor={light_color}
      />      
    )
  } else if (widget_type === 'rss' && is_dynamic_content) {
    return (
      <RssFeedWidget
        name={name}
        widget_type={widget_type}
        icon_name={icon_name}
        user_name={user_name}
        post_title={post_title}
        post_description={post_description}
        url={url}
        sort_order={sort_order}
        is_dynamic_content={is_dynamic_content}
        image_url={image_url}
        link_type={link_type}
        avatar_url={avatar_url}
        show_thumbnail={show_thumbnail}    
        backgroundColor={primary_color}  
      />
    )
  }
  return null;
}

export default Widget;