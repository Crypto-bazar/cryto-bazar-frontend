import { abi } from '@/shared/api';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { SetNFTContractAddress } from '../model';
import { setNFTContractAddress } from './api';

const useCreateToken = () => {
  const { writeContractAsync, data: hash } = useWriteContract();
  const { data: receipt, isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const createToken = async (id: number, name: string, symb: string, uri: string) => {
    const txHash = await writeContractAsync({
      abi: abi,
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      functionName: 'createNFT',
      args: [name, symb, uri],
    });

    const data: SetNFTContractAddress = {
      id: String(id),
      contract_address: receipt?.logs[0].address,
    };

    const response = await setNFTContractAddress(data);

    console.log(response?.data);

    return txHash;
  };

  const logs = receipt?.logs;

  return { createToken, receipt, isLoading, isSuccess, logs };
};

export { useCreateToken };
