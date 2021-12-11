import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AuthRoute from './AuthRoute'
import AuthedRoute from './AuthedRoute'
import PreviewProfileRoute from './PreviewProfileRoute'

import {DemoPage, ProfilePage, Home, 
  ProfileNew, ProfileEdit, ProfileSocialLinks, 
  ProfileTechSkills, ProfileWidgets, RecentProject
} from '../screens'
import {SignIn, SignUp} from '../auth'

const MainRoutes = () => {
  return (
    <Switch>
      {/* <Route exact path="/" component={DemoPage} />       */}
      <AuthedRoute exact path="/" component={Home} />      
      <AuthRoute exact path="/signin" component={SignIn} />
      <AuthRoute exact path="/signup" component={SignUp}/>
      <AuthedRoute exact path="/dashboard" component={Home}/>
      <AuthedRoute exact path="/new-profile" component={ProfileNew}/>
      <AuthedRoute exact path="/profile/:id" component={ProfileEdit} />
      <AuthedRoute exact path="/profile/:id/social-links" component={ProfileSocialLinks} />
      <AuthedRoute exact path="/profile/:id/tech-skills" component={ProfileTechSkills} />
      <AuthedRoute exact path="/profile/:id/widgets" component={ProfileWidgets} />
      <AuthedRoute exact path="/profile/:id/rencent-project" component={RecentProject} />
      <PreviewProfileRoute exact path="/preview/:id" component={ProfilePage} />
      <Route exact path="/:id" component={ProfilePage} /> 
    </Switch>
  )
}

export default MainRoutes;