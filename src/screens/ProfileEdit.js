import React, {useEffect, useState} from "react";
import { useAtom } from "jotai";
import { Link } from 'react-router-dom'
import { Col, Row, Button} from '@douyinfe/semi-ui';
import {EditProfile} from '../components'
import {fetchProfilesAtom, loadingProfilesAtom, updateProfileAtom} from '../jotais'

const ProfilEdit = (props) => {
  const id = props.match.params.id;  
  const [profiles, fetchProfiles] = useAtom(fetchProfilesAtom);
  const [loadingProfile] = useAtom(loadingProfilesAtom);
  const [_, updateProfile] = useAtom(updateProfileAtom);

  const [profile, setProfile] = useState(null);

  const handleUpdate = (values) => {
    updateProfile({id, values});
  }

  useEffect(() => {
    if(profiles.length === 0) {
      fetchProfiles();
    }
  }, []);

  useEffect(() => {
    if(profiles.length > 0) {
      const _p = profiles.filter((p) => p.id.toString() === id);
      if(_p.length === 1) {
        setProfile(_p[0]);
      }
    }
  }, [profiles])

  if(loadingProfile) return null;

  if(profile) {
    return (
      <EditProfile 
        name={profile.name}
        short_description={profile.short_description}
        onClick={handleUpdate}
      >       
        <Row type="flex" justify="center" style={{marginTop: "10px"}}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Link to="/" style={{ textDecoration: 'none' }}><Button block type="secondary">Cancel</Button></Link>
          </Col>
        </Row>       
      </EditProfile>
    )
  }

  return null;
}

export default ProfilEdit;