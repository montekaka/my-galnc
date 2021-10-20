import React from "react";

const ProfileLayout = (props) => {
  const {backgroundColor} = props;

  return (
    <div style={{
      backgroundColor
    }} className="profile-app-page-container">
      {props.children}
    </div>
  )
}

export default ProfileLayout;