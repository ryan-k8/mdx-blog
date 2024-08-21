import { useEffect, useState } from "react";

function useDebounce<T>(value:T, delay:number):readonly [T] {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue] as const;
};

export default useDebounce;
