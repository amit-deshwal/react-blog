import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setErrorMessage] = useState(null);
    useEffect(() => {
        fetch(url)
            .then(res => {
                console.log(res);
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
                setIsPending(false);
                setErrorMessage(err.message);
            })
    }, [url]);

    return { data, isPending, error }
}

export default useFetch;