import React, {useState, useEffect} from "react";
import {ProfileLayout} from '../components'
import {useFetchFeed} from '../hooks'
import {
  GithubCalendarCard,
  ProfileCard, SinglePost, 
  TweetCard, RecentPosts, MyStacks
} from 'glance-react-components'

const DemoPage = () => {
  const proxy = `${process.env.REACT_APP_MS}/v1/proxy_feed_parser?uri=`;
  const [mediumPosts, mediumLoading, errorMessage] = useFetchFeed("https://medium.com/feed/@jamievaron", proxy, 3)
  const [hashnodePosts, hashnodeLoading, _errorMessage] = useFetchFeed("https://miguendes.me/rss.xml", proxy, 5)


  return (
    <ProfileLayout backgroundColor="#0E163B">      
        <div className="col-1">
          <ProfileCard
            title="Jenny Wilson"
            subtitle="Font-end Developer"
            avatarSrc="https://avatars.githubusercontent.com/u/6300263?v=4"
            avatarSize="100"
            avatarBackgroundColor="#843CDD"
            fontFamily="DM Sans"
            backgroundColor="#131C45"
            primaryColor="#FFFFFF"
            secondaryColor="#FFFFFF80"
            linksColor="#04D98C"
            linkColor="#04A3D9"
            link="http://www.google.com"
            links={[{
              id: 'twitter',
              name: 'Twitter',
              url: "http://..."
            },
            {
              id: 'medium',
              name: 'Medium',
              url: "http://..."
            },
            {
              id: 'github',
              name: 'Github',
              url: "http://..."
            }
          ]}
          />
          <MyStacks
            title="Technical Skills"
            iconName="tech-stacks"
            fontFamily="Inter"
            backgroundColor="#131C45"      
            headerIconStyle={{
              width: "24px",
              height: "24px",
              rectFill: "#FFFFFF",
              pathFill: "#FFFFFF"
            }}
            headerStyle={{
              color: "#6E7598"
            }}  
            stacksBackgroundColor="#222E66"
            stacks={['python', 'my-sql', 'react-js', 'ant-design', 'firebase', 'nginx', 'mongo']}
          />          
          <SinglePost 
            title="Recent project"
            iconName="dribbble"
            postTitle="WeTrade Mobile App Exploration by Happy Tri Milliarta for Odama on Dribbble"
            imgSrc="https://cdn.dribbble.com/users/4208985/screenshots/16672355/wetrade_mobile_app_exploration_4x.png"
            link="https://dribbble.com/shots/16672355-WeTrade-Mobile-App-Exploration"
            numberOfItems={2}
            backgroundColor="#131C45"      
            fontFamily="DM Sans"
            headerIconStyle={{
              width: "24px",
              height: "24px",
              rectFill: "#3CD5ED",
              pathFill: "#FF5E62"
            }}
            headerStyle={{
              color: "#FFFFFF80"
            }}
            postTitleTextColor="#FFFFFF"
            postPubDateTextColor="#FFFFFF80"      
          />
          <TweetCard 
            title="Twitter"
            iconName="twitter"
            tweetBody="Because of duopoly’s in politics and business it’s no wonder why things are boring. Get up, attend meetings, turn off computer, sleep, repeat. Need some alternatives to the predictable norms."
            screenName="@ThePracticalDev"
            authorName="DEV Community"
            avatar="https://pbs.twimg.com/profile_images/1389789795065335809/A8H1fuQb_normal.jpg"
            likes="16"
            pubDate="2021-10-19T05:43:01+0000"
            link="https://twitter.com/ThePracticalDev/status/1450336663914389507"
            backgroundColor="#131C45"
            cardBackgroundColor="#1B275A"
            avatarBackgroundColor="#553BFF"
            fontFamily="DM Sans"
            headerIconStyle={{
              width: "24px",
              height: "24px",
              rectFill: "#3CD5ED",
              pathFill: "#1DA1F2"
            }}
            headerStyle={{
              color: "#6E7598"
            }}
            primaryTextColor="#FFFFFF"
            secondaryTextColor="#6E7598"      
          />          
        </div>
        <div className="col-2">
          <GithubCalendarCard
              title="Github"
              iconName="github"
              username="montekaka"
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
          <RecentPosts 
            loading={mediumLoading}
            title={"Medium Posts"} 
            iconName={"medium"} 
            posts={mediumPosts} 
            showThumbnail={false}
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
          <RecentPosts 
            loading={hashnodeLoading}
            title={"Hashnode Posts"} 
            iconName={"hashnode"} 
            posts={hashnodePosts} 
            showThumbnail={true}
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
        </div>
      
    </ProfileLayout>
  )
}

export default DemoPage;