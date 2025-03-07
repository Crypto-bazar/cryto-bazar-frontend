import { NFT } from '../types';
import axios from 'axios';

const getNFTs = async () => {
  try {
    // const response = await axiosInstance.get<NFT[]>('/api/v1/nfts/');
    const response = await axios.get<NFT[]>('http://localhost:8080/api/v1/nfts/');
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export { getNFTs };
