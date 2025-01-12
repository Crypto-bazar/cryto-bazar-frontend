import axios from 'axios';
import { AuthFormValues, AuthResponse } from '../model/types';

export const authApi = {
  login: async (data: AuthFormValues): Promise<AuthResponse> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/login`, data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/logout`);
  },
};
