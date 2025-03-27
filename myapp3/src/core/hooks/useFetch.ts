import { useEffect, useState } from "react";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: () => Promise<{ ok: boolean; data?: any; message?: string }>;
}

// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
export const useFetch = <T>({ callback }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true; // Evita actualizaciones si el componente se desmonta

    setLoading(true);
    callback()
      .then((response) => {
        if (!isMounted) return;

        if (!response.ok) {
          setError(response.message ?? "Error desconocido");
        } else {
          setData(response.data as T);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message ?? "Error de red");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false; // Cancela actualizaciones si el efecto se limpia
    };
  }, [callback]);

  return { error, data, loading };
};