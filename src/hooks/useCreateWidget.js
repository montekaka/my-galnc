import { useState } from "react";
import {railsApi} from '../apis';
import { useAtom } from "jotai";
import {setCurrentProfileAtom, setWidgetInputValueAtom, resetWidgetAtom, updateNotificationAtom} from '../jotais'

const useCreateWidget = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentProfile, setCurrentProfile] = useAtom(setCurrentProfileAtom)
  const [_, setWidgetInputValue] = useAtom(setWidgetInputValueAtom);
  const [__, resetWidget] = useAtom(resetWidgetAtom);
  const [___, updateNotification] = useAtom(updateNotificationAtom);
  
  const createWidget = (profileId, widgetData) => {
    setLoading(true);
    railsApi.post(`/v1/profiles/${profileId}/widgets`, widgetData)
    .then((res) => {
      setSuccessMessage('Widget added');
      setLoading(false);
      setErrorMessage(null);
      const newDate = new Date();
      setCurrentProfile({id: profileId, updatedDate: newDate});
      setWidgetInputValue(''); // reset the input value to empty
      resetWidget();
      updateNotification({
        status: true,
        message: 'Widget added',
        createdTime: new Date()
      })      
    })
    .catch((err) => {
      console.log(err)
      setSuccessMessage(null);
      setLoading(false);
      setErrorMessage('Failed to add widget');
      updateNotification({
        status: true,
        message: 'Failed to add widget',
        createdTime: new Date()
      })      
    })
    
  }


  return [createWidget, loading, successMessage, errorMessage, currentProfile]

}

export default useCreateWidget