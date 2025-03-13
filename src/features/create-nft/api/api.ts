import { CreateNFTRequest, SetNFTContractAddress } from '../model';
import { axiosInstance } from '@/shared/api';

const createNFTApi = async (data: CreateNFTRequest) => {
  try {
    return await axiosInstance.postForm<CreateNFTRequest>('/api/v1/nfts/', data);
  } catch (error) {
    console.error(error);
  }
};

const setNFTContractAddress = async (data: SetNFTContractAddress) => {
  try {
    return await axiosInstance.put('/api/v1/nfts/', data);
  } catch (error) {
    console.error(error);
  }
};

export { createNFTApi, setNFTContractAddress };
