import { ProductType } from '../types';
import { axiosInstance } from 'shared/api/axios';
import { AxiosResponse } from 'axios';

const userApi = {
  getProducts: async (): Promise<ProductType[]> => {
    try {
      const response: AxiosResponse<ProductType[]> = await axiosInstance.get('/advertisements');
      return response.data;
    } catch (e) {
      console.error(e);
      return [];
    }
  },
};

export { userApi };
