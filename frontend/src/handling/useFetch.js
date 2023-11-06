import { useState, useEffect } from 'react'

const useFetch = (url) => {
// hooks
const [ datalog, setData ] = useState(null);
const [ isPending, setIsPending ] = useState(true);
const [ error, setError ] = useState(null);
// /hooks

useEffect(() => {
    const abortCont = new AbortController(null);

      setTimeout(() => {
        fetch(url, {signal: abortCont.signal})
        .then(res => {
          if(!res.ok) {
            throw Error('couldnt fetch datalog from resource')
          }
          return res.json();
        })
        .then(datalog => {
          setData(datalog);
          setIsPending(false);
          setError(null)
        })
        .catch(err => {
          if (err.name === 'AbortError') {
            console.log('fetch aborted')
          } // else
          setIsPending(false);
          setError(err.message);
        })
      }, 1000);

      return () => abortCont.abort;
}, [url])
  return {datalog, isPending, error}
}

export default useFetch
