import React, {useEffect, useState} from "react";
import {railsApi} from '../apis'
import {  Button  } from '@douyinfe/semi-ui';
import { IconTwitter } from '@douyinfe/semi-icons';

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
    <div style={{ marginTop: "20px",width: "340px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>                  
      <Button 
        block
        theme="solid"
        type="secondary"
        onClick={onClick} 
        icon={<IconTwitter />}>Sign in With Twitter</Button>
    </div>
  )
}

export default SignInWithTwitter;