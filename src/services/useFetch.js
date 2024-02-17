import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url).
        then((res)=>{
            if(!res.ok){
                throw Error("Couldnt fetch data");
            }
            return res.json().then((data)=>{
                setData(data);
                setIsPending(false);
            }).catch((err) => {
                if(error.name !== 'AbortError'){
                    console.log(err);
                    setError(err.message);
                    setIsPending(false);
                }
            })
        });

        return () => {
            // No cleanup needed here
        };

    }, [url])

    return {data, isPending, error}
}

export default useFetch;