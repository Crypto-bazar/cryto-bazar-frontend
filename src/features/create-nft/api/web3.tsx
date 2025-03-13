import { abi } from '@/shared/api';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { SetNFTContractAddress } from '../model';
import { setNFTContractAddress } from './api';
import { useEffect, useState } from 'react';

const useCreateToken = () => {
  const { writeContractAsync, data: hash } = useWriteContract();
  const { data: receipt, isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  const [tokenId, setTokenId] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      if (isSuccess && receipt && tokenId !== null) {
        const data: SetNFTContractAddress = {
          id: String(tokenId),
          contract_address: receipt?.logs[0].address,
        };
        await setNFTContractAddress(data);
      }
    })();
  }, [isSuccess, receipt, tokenId]);

  const createToken = async (id: number, name: string, symb: string, uri: string) => {
    setTokenId(id);
    const txHash = await writeContractAsync({
      abi: abi,
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      functionName: 'createNFT',
      args: [name, symb, uri],
    });

    return txHash;
  };

  return { createToken, receipt, isLoading, isSuccess };
};

export { useCreateToken };
