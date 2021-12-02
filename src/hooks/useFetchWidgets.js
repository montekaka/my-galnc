import { useState, useEffect } from "react";
import {railsApi} from '../apis';
import { useAtom } from "jotai";
import {updateNotificationAtom} from '../jotais'

const useFetchWidgets = (id) => {
  const [items, setItems] = useState([]);
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [_, updateNotification] = useAtom(updateNotificationAtom)

  useEffect(() => {
    setLoading(true);

    railsApi.get(`/v1/profiles/${id}/widgets`)
    .then((res) => {      
      const arr = res.data;
      setItems(arr);
      setWidgets(arr)
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
    })
  }, [])

  const updateItems = (id, items) => {
    railsApi.post(`/v1/profiles/${id}/widgets`, {items})
    .then((res) => {
      // const skills = res.data.map((x) => x.icon_name);
      // setItems(skills);
      // setWidgets(res.data)
      // updateNotification({
      //   createdTime: new Date(),
      //   message: "Updated widgets",
      //   status: true,
      // })
    })
    .catch((err) => {
      updateNotification({
        createdTime: new Date(),
        message: "Failed to update widgets",
        status: true,
      })      
      console.log(err);
    })    
  }


  return [items, setItems, loading, updateItems, widgets, setWidgets]
}

export default useFetchWidgets;