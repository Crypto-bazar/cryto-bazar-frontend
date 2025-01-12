import axios, { AxiosResponse } from 'axios';
import { ProductType } from '../types';

const userApi = {
  getProducts: async (): Promise<ProductType[]> => {
    try {
      const response: AxiosResponse<ProductType[]> = await axios.get(`${process.env.NEXT_PUBLIC_API}/advertisements`);

      return response.data;
    } catch (e) {
      console.error(e);
      return []
    }
  },
};

export { userApi };