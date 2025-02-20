'use client';

import { RegisterFormValues, RegisterResponse } from 'features/registration/model/types';
import { axiosInstance } from 'shared/api/axios';

export const registerApi = {
  register: async (data: RegisterFormValues): Promise<RegisterResponse> => {
    const response = await axiosInstance.post('/auth/sign-up', data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },
};
