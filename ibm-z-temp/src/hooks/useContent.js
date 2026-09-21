import { useEffect, useState } from "react";
import { apiGet } from "../api";

// Returns the mock data straight away, then swaps in the API data
// if the backend is switched on (see src/api.js).
export function useContent(endpoint, fallback) {
  const [data, setData] = useState(fallback);

  useEffect(() => {
    let cancelled = false;
    apiGet(endpoint, fallback).then((result) => {
      if (!cancelled) setData(result);
    });
    return () => {
      cancelled = true;
    };
  }, [endpoint, fallback]);

  return data;
}
