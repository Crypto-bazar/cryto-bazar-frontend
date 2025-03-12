import { axiosInstance } from '@/shared/api';
import { NFT } from '../models/types';

const getNFTs = async () => {
  try {
    const response = await axiosInstance.get<NFT[]>('/api/v1/nfts/');
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export { getNFTs };
