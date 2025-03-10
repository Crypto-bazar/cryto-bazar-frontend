'use client';
import { useEffect } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { checkUser, createUser, verifySignatureRequest } from '../api';
import { CreateUserReq } from '../model';
import { SignatureRequest } from '@/entities/signature/model';

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
        message: message,
        signature: signature,
        eth_address: address as `0x${string}`,
      };

      const responseData = await createUser(data);
      // const responseData = await verifySignatureRequest(data);
      console.log(responseData);
    })();
  }, [address, signMessageAsync]);
};

export { useAuth };
