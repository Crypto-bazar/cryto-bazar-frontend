import { useEffect, useState } from 'react';
import { useReadContract, useWaitForTransactionReceipt, useWriteContract, useAccount } from 'wagmi';
import { DAOabi, PaymentAbi } from 'shared/models';
import { useTokenBalances } from 'features/token-balance/hooks';

const useBuyDaoToken = () => {
  const [step, setStep] = useState<'idle' | 'approving' | 'buying'>('idle');
  const { address } = useAccount();
  const { refetch: refetchBalances } = useTokenBalances(address);

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

  const {
    isLoading: isBuyLoading,
    isSuccess: isBuySuccess,
    data: buyReceipt,
  } = useWaitForTransactionReceipt({
    hash: buyHash,
  });

  const buyDAOWithApprove = async (amount: bigint) => {
    if (!tokenPrice) {
      throw new Error('Token price not available');
    }

    setStep('approving');

    const total = amount * tokenPrice;

    // Step 1: Approve
    await writeApprove({
      address: process.env.NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS as `0x${string}`,
      abi: PaymentAbi,
      functionName: 'approve',
      args: [process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`, total],
    });

    setStep('buying');

    // Step 2: Buy tokens
    const txHash = await writeBuy({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      abi: DAOabi,
      functionName: 'buyGovernanceTokens',
      args: [amount],
    });

    return txHash;
  };

  // Эффект для обновления балансов после успешной покупки
  useEffect(() => {
    if (isBuySuccess) {
      // Вариант 1: Просто обновляем балансы
      refetchBalances();

      // Вариант 2: Оптимистичное обновление (если знаем на сколько изменится баланс)
      // userActions.setDaoBalance(prev => (prev || 0n) + amount);
      // userActions.setPaymentBalance(prev => (prev || 0n) - totalPrice);
    }
  }, [isBuySuccess, refetchBalances]);

  const isLoading = isApproveLoading || isBuyLoading;
  const isSuccess = isBuySuccess && !isLoading;
  const receipt = buyReceipt ?? approveReceipt;

  return {
    buyDAOWithApprove,
    isLoading,
    isSuccess,
    receipt,
    step,
    tokenPrice,
  };
};

export { useBuyDaoToken };
