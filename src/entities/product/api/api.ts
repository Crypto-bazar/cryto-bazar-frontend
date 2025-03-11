import { ProductType } from '../types';
import { axiosInstance } from 'shared/api/axios';

const userApi = {
  getProducts: async (): Promise<ProductType[]> => {
    try {
      const { data } = await axiosInstance.get<ProductType[]>('/advertisements');
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },
};

export { userApi };
