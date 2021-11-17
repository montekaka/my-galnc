import { useState, useEffect } from "react";
import {railsApi} from '../apis';
import { useAtom } from "jotai";
import {updateNotificationAtom} from '../jotais'

const useFetchSocialNetworks = (id) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [_, updateNotification] = useAtom(updateNotificationAtom)

  useEffect(() => {
    setLoading(true);

    railsApi.get(`/v1/profiles/${id}/social_networks`)
    .then((res) => {
      setItems(res.data);
      setLoading(false);


    })
    .catch((err) => {
      setLoading(false);
    })
  }, [])

  const updateItems = (id, items) => {
    railsApi.post(`/v1/profiles/${id}/sync_social_networks`, {items})
    .then((res) => {
      setItems(res.data);
      updateNotification({
        createdTime: new Date(),
        message: "Updated social links",
        status: true,
      })
    })
    .catch((err) => {
      updateNotification({
        createdTime: new Date(),
        message: "Failed to update social links",
        status: true,
      })      
      console.log(err);
    })    
  }


  return [items, setItems, loading, updateItems]
}

export default useFetchSocialNetworks;