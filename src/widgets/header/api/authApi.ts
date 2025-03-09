import { axiosInstance } from '@/shared/api';
import { CheckUserReq, CreateUserReq } from '../model';
import { AxiosResponse } from 'axios';

const checkUser = async (data: CheckUserReq): Promise<AxiosResponse<boolean> | undefined> => {
  try {
    const response = await axiosInstance.post<boolean>('api/v1/users/check', data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const createUser = async (data: CreateUserReq) => {
  try {
    const response = await axiosInstance.post('api/v1/users/', data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export { checkUser, createUser };
