import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await fetchFunction();
            setData(data);
            setError(null);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setData(null);
        setError(null);
    };

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, []);

    return { data, loading, error, fetchData, reset };

}

export default useFetch