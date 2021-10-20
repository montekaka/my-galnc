import React from "react";

const ProfileLayout = (props) => {
  const {backgroundColor} = props;

  return (
    <div style={{
      backgroundColor,
    }} className="profile-app-page-container">
      <div className="profile-app-page-grid">
        {props.children}
      </div>
    </div>
  )
}

export default ProfileLayout;