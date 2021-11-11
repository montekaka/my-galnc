import {
  GithubCalendarCard,
  ProfileCard, SinglePost, 
  TweetCard, RecentPosts, MyStacks
} from 'glance-react-components'

const Widget = (props) => {
  const {name, widget_type, icon_name, post_title, post_description, url, is_dynamic_content, sort_order, image_url, user_name, link_type, avatar_url, show_thumbnail} = props;

  if(widget_type === 'github_calendar') {
    return (
      <GithubCalendarCard
          title={name}
          iconName={icon_name}
          username={user_name}
          backgroundColor="#131C45"
          cardBackgroundColor="#1B275A"  
          linkColor="#6E7598"
          linkBackgroundColor="#182354"
          fontFamily="DM Sans"    
          headerIconStyle={{
            width: "24px",
            height: "24px",
            rectFill: "#FFFFFF",
            pathFill: "#FFFFFF"
          }}
          headerStyle={{
            color: "#6E7598"
          }}   
          colors={["#1B275A","#BBE3D5","#006d32","#26a641","#39d353"]}
      />      
    )
  }
  return null;
}

export default Widget;