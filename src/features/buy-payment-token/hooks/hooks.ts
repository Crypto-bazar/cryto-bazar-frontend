import { useState } from 'react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { type Address, formatEther } from 'viem';
import { DAOabi } from 'shared/models';

const useBuyPopTokens = () => {
  const [step, setStep] = useState<'idle' | 'buying' | 'refunding'>('idle');
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();

  const { data: tokenPrice } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
    abi: [
      {
        inputs: [],
        name: 'tokenPrice',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'tokenPrice',
  });

  const { writeContractAsync: buyTokens, data: txHash, isPending: isWritePending } = useWriteContract();

  const {
    isLoading: isTxLoading,
    isSuccess: isTxSuccess,
    isError: isTxError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const buyPopTokens = async (amount: bigint, value: bigint) => {
    try {
      setStep('buying');
      setError(null);

      if (!address) {
        throw new Error('Wallet not connected');
      }

      if (!tokenPrice) {
        throw new Error('Token price not available');
      }

      const requiredValue = amount * tokenPrice;

      if (value < requiredValue) {
        throw new Error(`Insufficient ETH. Required: ${formatEther(requiredValue)} ETH`);
      }

      await buyTokens({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
        abi: DAOabi,
        functionName: 'buyPopTokens',
        args: [amount],
        value: requiredValue,
      });

      setStep('refunding');
    } catch (err) {
      setStep('idle');
      setError(err instanceof Error ? err.message : 'Transaction failed');
      throw err;
    }
  };

  return {
    buyPopTokens,
    isLoading: isWritePending || isTxLoading,
    isSuccess: isTxSuccess,
    isError: isTxError,
    error,
    step,
    txHash,
    tokenPrice,
  };
};

export { useBuyPopTokens };
