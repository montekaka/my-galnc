import { useState } from "react";
import {railsApi} from '../apis';

const useCreateWidget = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null);
  
  const createWidget = (profileId, widgetData) => {
    setLoading(true);
    railsApi.post(`/v1/profiles/${profileId}/widgets`, widgetData)
    .then((res) => {
      setSuccessMessage('Widget added');
      setLoading(false);
      setErrorMessage(null);
    })
    .catch((err) => {
      setSuccessMessage(null);
      setLoading(false);
      setErrorMessage('Failed to add widget');
    })
    
  }


  return [createWidget, loading, successMessage, errorMessage]

}

export default useCreateWidget