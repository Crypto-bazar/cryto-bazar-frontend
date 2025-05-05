import { useState } from 'react';
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { DAOabi, PaymentAbi } from 'shared/models';

const useBuyDaoToken = () => {
  const [step, setStep] = useState<'idle' | 'approving' | 'buying'>('idle');

  const { data: tokenPrice } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: DAOabi,
    functionName: 'tokenPrice',
  });

  const { writeContractAsync: writeApprove, data: approveHash } = useWriteContract();
  const { writeContractAsync: writeBuy, data: buyHash } = useWriteContract();

  const { isLoading: isApproveLoading, data: approveReceipt } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  const { isLoading: isBuyLoading, data: buyReceipt } = useWaitForTransactionReceipt({
    hash: buyHash,
  });

  const buyDAOWithApprove = async (amount: bigint) => {
    if (!tokenPrice) {
      throw new Error('Token price not available');
    }

    setStep('approving');

    const total = amount * tokenPrice;

    await writeApprove({
      address: process.env.NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS as `0x${string}`,
      abi: PaymentAbi,
      functionName: 'approve',
      args: [process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`, total],
    });

    setStep('buying');
    return writeBuy({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      abi: DAOabi,
      functionName: 'buyGovernanceTokens',
      args: [amount],
    });
  };

  const isLoading = isApproveLoading || isBuyLoading;
  const isSuccess = !!buyReceipt && !isLoading;
  const receipt = buyReceipt ?? approveReceipt;

  return { buyDAOWithApprove, isLoading, isSuccess, receipt, step, tokenPrice };
};

export { useBuyDaoToken };
