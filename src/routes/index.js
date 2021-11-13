import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AuthRoute from './AuthRoute'
import AuthedRoute from './AuthedRoute'

import {DemoPage, ProfilePage, Home} from '../screens'
import {SignIn} from '../auth'

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={DemoPage} />      
      <AuthRoute exact path="/signin" component={SignIn} />
      <AuthedRoute exact path="/dashboard" component={Home}/>
      <Route exact path="/:id" component={ProfilePage} />       
    </Switch>
  )
}

export default MainRoutes;