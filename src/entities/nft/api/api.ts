import { axiosInstance } from 'shared/api';
import { NFT, nftActions } from '../models';

const getNFTs = async () => {
  try {
    const response = await axiosInstance.get<NFT[]>('/api/v1/nfts/');
    if (response.status == 200) {
      nftActions.setNFTs(response.data);
    }
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const getUserNFTs = async (address: `0x${string}` | undefined) => {
  try {
    const response = await axiosInstance.get<NFT[]>(`/api/v1/nfts/user?address=${address}`);
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const getNFTById = async (id: string) => {
  try {
    const response = await axiosInstance.get<NFT>(`/api/v1/nfts/${id}`);
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const getSalesNFT = async (): Promise<NFT[]> => {
  try {
    const response = await axiosInstance.get<NFT[]>('/api/v1/nfts/sales');

    if (response.status === 200) {
      nftActions.setSalesNFTs(response.data);
    }

    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const getFavouriteNFTs = async (address: `0x${string}` | undefined) => {
  try {
    const response = await axiosInstance.get<NFT[]>(`/api/v1/nfts/favourites?address=${address}`);

    if (response.status === 200) {
      nftActions.setFavourites(response.data);
    }

    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const addFavouriteNFT = async (eth_address: `0x${string}` | undefined, tokenId: number) => {
  try {
    const response = await axiosInstance.post<NFT>(`/api/v1/nfts/favourites`, {
      eth_address: eth_address,
      token_id: String(tokenId),
    });
    if (response.status === 200) {
      nftActions.addFavouriteNFT(response.data);
    }
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export { getNFTs, getUserNFTs, getNFTById, getSalesNFT, getFavouriteNFTs, addFavouriteNFT };
