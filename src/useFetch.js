import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setErrorMessage] = useState(null);
    useEffect(() => {
        const abortControl = new AbortController();
        fetch(url, { signal: abortControl.signal })
            .then(res => {
                if (!res.ok) {
                    throw Error('Unable to load data from the resource')
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsPending(false);
                setErrorMessage(null);
            })
            .catch(err => {
                if(err.name === "AbortError"){
                    return null;
                }
                setIsPending(false);
                setErrorMessage(err.message);
            })

        return () => abortControl.abort();
    }, [url]);

    return { data, isPending, error }
}

export default useFetch;