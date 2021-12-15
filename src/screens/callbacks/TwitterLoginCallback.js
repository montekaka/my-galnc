import React, {useEffect, useState} from "react";
import queryString from 'query-string'
import { Redirect } from 'react-router-dom'
import {railsApi} from '../../apis'
import { useAtom } from 'jotai';
import { signinWithTwitterAtom, updateNotificationAtom } from '../../jotais'

const TwitterLoginCallback = (props) => {
  const [, userSignIn] = useAtom(signinWithTwitterAtom);
  const [notificationData, updateNotification] = useAtom(updateNotificationAtom)

  const [loading, setLoading] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);  
  const values = queryString.parse(props.location.search);
  const oauth_token = values['oauth_token'];
  const oauth_verifier = values['oauth_verifier'];
  const denied = values['denied'];

  useEffect(() => {
    if(oauth_token && oauth_verifier) {
      setLoading(true);
      userSignIn({
        oauth_token, oauth_verifier
      })
    }
    if(denied) {
      // delete the token from session
      // redirect back to login page, with alert on

      const _data = {...notificationData, 
        createdTime: new Date(),
        message: "Denied to sign in with Twitter.",
        status: true,
      }

      railsApi.post(`/v1/delete_oauth_token_session`, {
        token: denied,
        provider: "Twitter"
      })
      .then((res) => {
        setIsRedirect(true)
        updateNotification(_data)
      })
      .catch((err) => {
        setIsRedirect(true)
        updateNotification(_data)
      })
      // set up some notification
    }
  }, []);

  if(isRedirect) {
    return <Redirect to="/signin"/>
  }

  return (
    <div></div>
  )
}

export default TwitterLoginCallback