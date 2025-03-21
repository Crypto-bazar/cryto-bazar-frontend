import { axiosInstance } from 'shared/api';
import { NFT } from '../models';

const getNFTs = async () => {
  try {
    const response = await axiosInstance.get<NFT[]>('/api/v1/nfts/');
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

export { getNFTs, getUserNFTs };
