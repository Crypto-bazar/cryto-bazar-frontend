'use client';
import { useEffect } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { checkUser, createUser } from '../api';
import { CreateUserReq } from '../model';

const useAuth = () => {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  useEffect(() => {
    (async () => {
      const response = await checkUser({ address: address as string });
      if (!response) return;

      if (response.data) {
        return;
      }

      const message = `Sign this message to authenticate: ${Date.now()}`;
      const signature = await signMessageAsync({ message });

      const data: CreateUserReq = {
        eth_address: address,
        message: message,
        signature: signature,
      };

      await createUser(data);
    })();
  }, [address]);
};

export { useAuth };
