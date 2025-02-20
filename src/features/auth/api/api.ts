'use client';
import { axiosInstance } from '@/shared/api/axios';
import { AuthFormValues, AuthResponse } from '../model/types';

export const authApi = {
  login: async (data: AuthFormValues): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/sign-in', data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },
};
