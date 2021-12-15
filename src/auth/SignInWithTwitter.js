import React, {useEffect, useState} from "react";
import {railsApi} from '../apis'

const SignInWithTwitter = () => {
  // to get the login to twitter link
  const onClick = () => {
    railsApi.get(`/v1/twitter_sign_in_link`)
    .then((res) => {
      const url = res.data.request_url;      
      window.location.href = url;
    })
    .catch((err) => {
      // indicate something went wrong
      console.log(err);
    })
  }
  
  return (
    <div onClick={onClick}>Sign in With Twitter</div>
  )
}

export default SignInWithTwitter;