import { useRef, useCallback } from 'react';

export const useDebounce = (callback: Function, delay: number) => {
  const timeoutRef = useRef<number | undefined>();

  const debouncedCallback = useCallback((...args: any) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  return debouncedCallback;
};
