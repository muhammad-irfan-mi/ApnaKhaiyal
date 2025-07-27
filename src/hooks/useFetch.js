import { useEffect, useState } from 'react';

const useFetch = (
  method = 'GET',
  path,
  token = null,
  body = null,
  dependencies = []
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiEndPoint = `${import.meta.env.VITE_BASE_URL}/api/${path}`;

      const requestOptions = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: body ? JSON.stringify(body) : null,
      };

      try {
        const response = await fetch(apiEndPoint, requestOptions);

        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch (jsonError) {
            errorData = { message: `Error: ${jsonError.message}` };
          }

          if (response.status === 401) {
            // optionally redirect to login
            // window.location.href = `${import.meta.env.VITE_CLIENT_BASE_URL}/login`;
          }

          setError(errorData);
          setData(null);
          return;
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (fetchError) {
        setError({ message: fetchError.message });
        setData(null);
      }
    };

    fetchData();
  }, [method, path, token, JSON.stringify(body), ...dependencies]);

  return [data, error];
};

export default useFetch;
