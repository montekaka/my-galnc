import { useState, useEffect } from "react";
import {railsApi} from '../apis';

const useFetchProfiles = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);

    railsApi.get('/v1/profiles')
    .then((res) => {
      setItems(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    })
  }, [])


  return [items, loading]
}

export default useFetchProfiles;