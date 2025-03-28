import { useEffect } from 'react';
import { worker } from 'shared/mocks';

const MockService = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
      worker.start();
    }
  }, []);
  return null;
};

export { MockService };
