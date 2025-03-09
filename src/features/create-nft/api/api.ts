import { CreateNFTRequest } from '../model/types';
import { axiosInstance } from '@/shared/api';

const createNFTApi = async (data: CreateNFTRequest) => {
  try {
    return await axiosInstance.postForm<CreateNFTRequest>('/api/v1/nfts/', data);
  } catch (error) {
    console.error(error);
  }
};

export { createNFTApi };
