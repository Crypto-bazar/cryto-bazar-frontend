import { useReadContracts, useAccount, useBlockNumber } from 'wagmi';
import { erc20Abi } from 'viem';
import { useEffect } from 'react';
import { userActions } from 'entities/user/models/store';

export const useTokenBalances = (userAddress: `0x${string}` | undefined) => {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { address: connectedAddress } = useAccount();

  const contracts = [
    {
      address: process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS as `0x${string}`,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [userAddress],
    },
    {
      address: process.env.NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS as `0x${string}`,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [userAddress],
    },
    {
      address: process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS as `0x${string}`,
      abi: erc20Abi,
      functionName: 'decimals',
    },
    {
      address: process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS as `0x${string}`,
      abi: erc20Abi,
      functionName: 'symbol',
    },
    {
      address: process.env.NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS as `0x${string}`,
      abi: erc20Abi,
      functionName: 'decimals',
    },
    {
      address: process.env.NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS as `0x${string}`,
      abi: erc20Abi,
      functionName: 'symbol',
    },
  ];

  const { data, isLoading, error, refetch } = useReadContracts({
    contracts,
    allowFailure: true,
    query: {
      // Автоматически рефетчить при изменении блока или адреса
      enabled: !!userAddress,
    },
  });

  // Эффект для обновления стора при изменении балансов
  useEffect(() => {
    if (!data || !userAddress) return;

    const daoBalance = data[0]?.result as bigint | undefined;
    const paymentBalance = data[1]?.result as bigint | undefined;

    if (daoBalance !== undefined) {
      userActions.setDaoBalance(daoBalance);
    }

    if (paymentBalance !== undefined) {
      userActions.setPaymentBalance(paymentBalance);
    }
  }, [data, userAddress]);

  // Эффект для автоматического рефетча при изменении блока или подключенного адреса
  useEffect(() => {
    if (userAddress && connectedAddress === userAddress) {
      refetch();
    }
  }, [blockNumber, connectedAddress, userAddress, refetch]);

  // Если data не undefined и содержит все ожидаемые результаты
  const balances = {
    daoBalance: data?.[0]?.result as bigint | undefined,
    paymentBalance: data?.[1]?.result as bigint | undefined,
    daoDecimals: data?.[2]?.result as number | undefined,
    daoSymbol: data?.[3]?.result as string | undefined,
    paymentDecimals: data?.[4]?.result as number | undefined,
    paymentSymbol: data?.[5]?.result as string | undefined,
  };

  const manualRefetch = async () => {
    const result = await refetch();
    return {
      daoBalance: result.data?.[0]?.result as bigint | undefined,
      paymentBalance: result.data?.[1]?.result as bigint | undefined,
    };
  };

  return {
    ...balances,
    isLoading,
    error,
    refetch: manualRefetch, // Возвращаем улучшенную версию refetch
  };
};
