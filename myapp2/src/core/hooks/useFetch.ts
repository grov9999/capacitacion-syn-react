import { useEffect, useState } from "react";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: Promise<any>;
}

// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
export const useFetch = <T extends Object>(props: Props) => {
  const [error, setError] = useState<string | null | undefined>(null);
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    props.callback.then((response) => {
      setLoading(false);
      if (!response.ok) {
        setError(response.message);
      } else {
        setData(response.data as T);
      }
    });
  }, []);

  return {
    error,
    data,
    loading,
  };
};