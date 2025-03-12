import { abi } from '@/shared/api';
import { ContractFunctionNames } from '@/shared/models';
import { useWriteContract } from 'wagmi';

type ContractMethodParams = {
  functionName: ContractFunctionNames;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any[];
};

const useWeb3Contract = () => {
  const { data, writeContract, error, isPending } = useWriteContract();
  const callContractMethod = async ({ args, functionName }: ContractMethodParams) => {
    try {
      await writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: abi,
        functionName,
        args,
      });
    } catch (error) {
      console.error('Error calling contract method: ', error);
    }
  };
  return { data, callContractMethod, error, isPending };
};

export { useWeb3Contract };
