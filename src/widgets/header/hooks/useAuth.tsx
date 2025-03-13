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
      if (!isConnected && !address) return;
      const response = await checkUser({ address: address as string });
      if (!response) return;

      if (response.data) {
        return;
      }

      const message = `Sign this message to authenticate: ${Date.now()}`;
      const signature = await signMessageAsync({ message });

      const data: CreateUserReq = {
        message: message,
        signature: signature,
        eth_address: address as `0x${string}`,
      };

      await createUser(data);
    })();
  }, [address, signMessageAsync, isConnected]);
};

export { useAuth };
