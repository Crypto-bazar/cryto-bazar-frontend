import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { DAOabi } from 'shared/models';
import { PaymentAbi } from 'shared/models';
import { useState, useEffect } from 'react';
import { useGetAllNFTs } from 'entities/nft/hooks/hooks';

const useBuyNFTWithApprove = () => {
  const [step, setStep] = useState<'idle' | 'approving' | 'buying'>('idle');
  const { writeContractAsync: writeApprove, data: approveHash } = useWriteContract();
  const { writeContractAsync: writeBuy, data: buyHash } = useWriteContract();

  const { isLoading: isApproveLoading } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  const {
    isLoading: isBuyLoading,
    isSuccess: isBuySuccess,
    data: buyReceipt,
  } = useWaitForTransactionReceipt({
    hash: buyHash,
  });

  const { refetch } = useGetAllNFTs();

  useEffect(() => {
    if (isBuySuccess) {
      refetch();
    }
  }, [isBuySuccess, refetch]);

  const buyNFTWithApprove = async (tokenId: bigint, price: bigint) => {
    setStep('approving');

    await writeApprove({
      address: process.env.NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS as `0x${string}`,
      abi: PaymentAbi,
      functionName: 'approve',
      args: [process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`, price],
    });

    setStep('buying');
    return writeBuy({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      abi: DAOabi,
      functionName: 'buyNFT',
      args: [tokenId],
    });
  };

  const isLoading = isApproveLoading || isBuyLoading;
  const isSuccess = isBuySuccess && !isLoading;
  const receipt = buyReceipt;

  return { buyNFTWithApprove, isLoading, isSuccess, receipt, step };
};

export { useBuyNFTWithApprove };
