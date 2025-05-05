import { useReadContracts } from 'wagmi';
import { erc20Abi } from 'viem';

export const useTokenBalances = (userAddress: `0x${string}` | undefined) => {
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
    // Опционально можно добавить получение decimals и symbol для каждого токена
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
    allowFailure: true, // Продолжать при ошибках отдельных запросов
  });

  // Если data не undefined и содержит все ожидаемые результаты
  const balances = {
    daoBalance: data?.[0]?.result as bigint | undefined,
    paymentBalance: data?.[1]?.result as bigint | undefined,
    daoDecimals: data?.[2]?.result as number | undefined,
    daoSymbol: data?.[3]?.result as string | undefined,
    paymentDecimals: data?.[4]?.result as number | undefined,
    paymentSymbol: data?.[5]?.result as string | undefined,
  };

  return {
    ...balances,
    isLoading,
    error,
    refetch,
  };
};
