import { useState, useEffect } from "react";
import axios from 'axios'

const useFetchProfile = (slug, updatedDate) => {
  const [darkColor, setDarkColor] = useState(null);
  const [profile, setProfile] = useState(null);
  const [socialNetworks, setSocialNetworks] = useState([]);
  const [techSkills, setTechSkills] = useState([]);
  const [bodyWidgets, setBodyWidgets] = useState([]);
  const [bannerWidgets, setBannerWidgets] = useState([]);
  const [headerWidgets, setHeaderWidgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if(slug) {
      setLoading(true);
      setErrorMessage(null);

      axios.get((`${process.env.REACT_APP_RAILS}/v1/public_profiles/${slug}`))
      .then((res) => {
        
        setLoading(false);
        const {profile, social_networks, tech_skills, body_widgets, banner_widgets, header_pinned} = res.data;
        
        setDarkColor(profile.dark_color);
        setProfile(profile);
        setSocialNetworks(social_networks)
        setTechSkills(tech_skills)
        setBodyWidgets(body_widgets)
        setBannerWidgets(banner_widgets)   
        setHeaderWidgets(header_pinned)     
      })
      .catch((err) => {
        setLoading(false);
        setErrorMessage('Failed to load the page')
      })

    }
  }, [slug, updatedDate])

  return [profile, socialNetworks, techSkills, headerWidgets, bodyWidgets, bannerWidgets, loading, errorMessage];
}

export default useFetchProfile;