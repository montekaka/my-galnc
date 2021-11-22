import { useState } from "react";
import {railsApi} from '../apis';
import { useAtom } from "jotai";
import {setCurrentProfileAtom} from '../jotais'

const useCreateWidget = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentProfile, setCurrentProfile] = useAtom(setCurrentProfileAtom)
  
  const createWidget = (profileId, widgetData) => {
    setLoading(true);
    railsApi.post(`/v1/profiles/${profileId}/widgets`, widgetData)
    .then((res) => {
      setSuccessMessage('Widget added');
      setLoading(false);
      setErrorMessage(null);
      const newDate = new Date();
      setCurrentProfile({id: profileId, updatedDate: newDate});
    })
    .catch((err) => {
      console.log(err)
      setSuccessMessage(null);
      setLoading(false);
      setErrorMessage('Failed to add widget');
    })
    
  }


  return [createWidget, loading, successMessage, errorMessage, currentProfile]

}

export default useCreateWidget