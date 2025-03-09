'use client';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { checkUser, createUser } from '../api';

const useAuth = () => {
  const { address } = useAccount();
  //   const { signMessageAsync } = useSignMessage();
  //   const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await checkUser({ address: address as string });
      if (!response) return;

      if (response.data) {
        return;
      }

      await createUser({ eth_address: address as string });
    })();
  }, [address]);
};

export { useAuth };
