import { useState, useEffect } from "react";
import { parse } from 'node-html-parser';
import {feedParser} from '../libs'

const useFetchFeed = (url, proxy, numberOfItems) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const feedItems = [];

    if(url && url.length > 1) {
      setLoading(true);
      feedParser(url, proxy)
      .then((res) => {
        const feedRes = proxy && proxy.length > 0 ? res.data : res;

        feedRes.items.forEach((item) => {
          // console.log(item["content:encoded"])
          // const desc = parse(item["content:encoded"]);
          // const images = root.querySelectorAll('img');
          const description = item["content:encoded"] ? item["content:encoded"] : item.content;

          feedItems.push({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            description: description
          })
        })
        const _items = feedItems.slice(0, numberOfItems);
        const __items = _items.map((x) => {
          if(x.description) {
            const root = parse(x.description);
            const images = root.querySelectorAll('img');

            const imgSrc = images.length > 0 ? images[0].attributes.src : "PLACEHOLDER";
            return {
              ...x, 
              imgSrc
            }
          } else {
            return x;
          }
        })

        setLoading(false);
        setItems(__items)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false);
        setItems([]);
        setErrorMessage(`${url} is not able to reach.  Please try again later.`)
      })
    } else {
      setLoading(false);
      setItems([]);
    }
  }, [url])

  useEffect(() => {
    const _items = items.slice(0, numberOfItems);
    setItems(_items)
  }, [numberOfItems])

  return [items, loading, errorMessage];
}

export default useFetchFeed;