'use client';
import { axiosInstance } from '@/shared/api/axios';
import { AuthFormValues, AuthResponse } from '../model/types';

export const authApi = {
  login: async (data: AuthFormValues): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/sign-in', data);
    return response.data;
  },
};
