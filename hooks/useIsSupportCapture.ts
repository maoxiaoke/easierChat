import { useLayoutEffect, useState } from 'react';

export const useIsSupportCapture = () => {
  const [isSupport, setIsSupport] = useState(true);

  useLayoutEffect(() => {
    const input = document.createElement('input');
    input.type = 'file';

    if (!('capture' in input)) {
      setIsSupport(false);
    }
  }, []);

  return isSupport;
};

