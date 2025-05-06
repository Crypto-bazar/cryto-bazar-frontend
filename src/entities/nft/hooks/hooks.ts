import { useAccount, useReadContract } from 'wagmi';
import { DAOabi } from 'shared/models';
import { useQuery } from 'wagmi/query';
import { readContract } from '@wagmi/core';
import { config } from 'app/web3';
import { NFT, nftActions } from '../models';
import { getFavouriteNFTs } from 'entities/nft/api';
import { useCallback, useEffect, useMemo, useState } from 'react';

const useGetAllNFTs = () => {
  return useQuery({
    queryKey: ['nfts'],
    queryFn: async () => {
      const data = await readContract(config, {
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: DAOabi,
        functionName: 'getAllNFTs',
      });

      // Handle the data immediately after fetching
      if (Array.isArray(data)) {
        nftActions.setNFTs(data);
      }

      return data;
    },
    staleTime: 10_000,
  });
};

const useGetNFT = (id: bigint) => {
  const { data, isLoading, error } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: DAOabi,
    functionName: 'getNFT',
    args: [id],
  });

  return { isLoading, error, data };
};

const useGetFavouriteNFT = () => {
  const { address } = useAccount();
  const [favoriteIds, setFavoriteIds] = useState<bigint[]>([]);

  const fetch = useCallback(async () => {
    if (!address) return;
    const { nftIds } = await getFavouriteNFTs(address);
    setFavoriteIds(nftIds.map((id) => BigInt(id)));
  }, [address]);

  useEffect(() => {
    fetch();
  }, [address, fetch]);

  const { data, isLoading, error } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: DAOabi,
    functionName: 'getNFTsBatch',
    args: [favoriteIds],
    query: {
      enabled: favoriteIds.length > 0,
    },
  });

  const mutableData = (data || []) as NFT[];
  nftActions.setFavourites(mutableData);

  return { isLoading, error, data: mutableData, refetch: fetch };
};
export { useGetAllNFTs, useGetNFT, useGetFavouriteNFT };
