import { useEffect } from 'react';

const usePreventBack = () => {
  useEffect(() => {
    const handlePopState = (event) => {
      window.history.pushState(null, '', window.location.href);
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
};

export default usePreventBack;
