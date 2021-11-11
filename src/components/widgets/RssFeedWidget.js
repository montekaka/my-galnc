import React from "react";
import {RecentPosts} from 'glance-react-components'
import {useFetchFeed} from '../../hooks'

const RssFeedWidget = (props) => {
  const {name, widget_type, icon_name, post_title, post_description, url, is_dynamic_content, sort_order, image_url, user_name, link_type, avatar_url, show_thumbnail} = props;

  const proxy = `${process.env.REACT_APP_MS}/v1/proxy_feed_parser?uri=`;
  const [posts, loading, errorMessage] = useFetchFeed(url, proxy, 5)

  return (
      <RecentPosts 
        loading={loading}
        title={name} 
        iconName={icon_name} 
        posts={posts} 
        showThumbnail={show_thumbnail}
        backgroundColor={"#131C45"}
        fontFamily="DM Sans"
        headerIconStyle={{
          width: "24px",
          height: "24px",
          rectFill: "#3CD5ED",
          pathFill: "#fff"
        }}
        headerStyle={{
          color: "#FFFFFF80"
        }}
        postTitleTextColor="#FFFFFF"
        postPubDateTextColor="#FFFFFF80"
    />    
  )
}

export default RssFeedWidget;