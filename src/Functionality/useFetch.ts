// import React, { useState, useEffect } from 'react';
//
//
// const useFetch = (url) => {
//     const [data, setData] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//         const abortCont = new AbortController();
//         setTimeout(() => {
//             fetch(url, {singal: abortCont.signal})
//                 .then(res => {
//                     if(!res.ok){
//                         throw Error('Could not fetch data.');
//                     }
//                     return res.json()
//                 })
//                 .then((data) => {
//                     setError(null);
//                     setData(data);
//                     setIsLoading(false);
//                 })
//                 .catch(err => {
//                     if (err.name === 'AbortError') {
//                         console.log('fetch aborted')
//                     }
//                     setIsLoading(false);
//                     setError(err.message);
//                 })
//         },1000);
//         return () => abortCont.abort();
//     },[url]);
//     return {data, isLoading, error}
// }
//
// export default useFetch;


import { useState, useEffect } from 'react';

const useFetch = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error('Could not fetch data for that resource');
                    }
                    return res.json() as Promise<T>;
                })
                .then((data) => {
                    setError(null);
                    setData(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted');
                    } else {
                        setIsLoading(false);
                        setError(err.message);
                    }
                });
        }, 1000);

        return () => abortCont.abort();
    }, [url]);

    return { data, isLoading, error };
}

export default useFetch;
