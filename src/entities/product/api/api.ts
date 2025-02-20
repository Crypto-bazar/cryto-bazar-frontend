import { ProductType } from '../types';
import { axiosInstance } from 'shared/api/axios';

const userApi = {
  getProducts: async (): Promise<ProductType[]> => {
    try {
      const response = await axiosInstance.get<ProductType[]>('/advertisements');
      return response.data;
    } catch (e) {
      console.error(e);
      return [];
    }
  },
};

export { userApi };
