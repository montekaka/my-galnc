import { useState, useEffect } from "react";
import {railsApi} from '../apis';
import { useAtom } from "jotai";
import {updateNotificationAtom} from '../jotais'

const useFetchTechSkills = (id) => {
  const [items, setItems] = useState([]);
  const [techSkills, setTechSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [_, updateNotification] = useAtom(updateNotificationAtom)

  useEffect(() => {
    setLoading(true);

    railsApi.get(`/v1/profiles/${id}/tech_skills`)
    .then((res) => {      
      const skills = res.data.map((x) => x.icon_name);
      setItems(skills);
      setTechSkills(res.data)
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
    })
  }, [])

  const updateItems = (id, items) => {
    railsApi.post(`/v1/profiles/${id}/sync_tech_skills`, {items})
    .then((res) => {
      const skills = res.data.map((x) => x.icon_name);
      setItems(skills);
      setTechSkills(res.data)
      updateNotification({
        createdTime: new Date(),
        message: "Updated tech skills",
        status: true,
      })
    })
    .catch((err) => {
      updateNotification({
        createdTime: new Date(),
        message: "Failed to update tech skills",
        status: true,
      })      
      console.log(err);
    })    
  }


  return [items, setItems, loading, updateItems, techSkills, setTechSkills]
}

export default useFetchTechSkills;