import { useEffect, useState } from "react";
import urlEnv from "../utils/url";

const useFetch = <T,>(url: string, options = {}): { isLoading: boolean; data: T | null; error: unknown } => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                if (!url) {
                    throw new Error("URL is required");
                }
                const response = await fetch(`${urlEnv.main}`+ url, options);

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, options]);

    return { isLoading, data, error };
};

export default useFetch;
