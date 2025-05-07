import { useAccount, useReadContract } from 'wagmi';
import { DAOabi } from 'shared/models';
import { useQuery } from 'wagmi/query';
import { readContract } from '@wagmi/core';
import { config } from 'app/web3';
import { NFT, nftActions } from '../models';
import { getFavouriteNFTs } from 'entities/nft/api';
import { useCallback, useEffect, useState } from 'react';

const useGetAllNFTs = () => {
  const query = useQuery({
    queryKey: ['nfts'],
    queryFn: async () => {
      return await readContract(config, {
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: DAOabi,
        functionName: 'getAllNFTs',
      });
    },
    staleTime: 10_000,
  });

  useEffect(() => {
    if (query.data && Array.isArray(query.data)) {
      nftActions.setNFTs(query.data);
    }
  }, [query.data]);

  return query;
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

  useEffect(() => {
    if (data) {
      nftActions.setFavourites(data as NFT[]);
    }
  }, [data, address]);

  return { isLoading, error, data: data as NFT[] | undefined, refetch: fetch };
};
export { useGetAllNFTs, useGetNFT, useGetFavouriteNFT };
