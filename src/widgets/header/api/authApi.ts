import { axiosInstance } from '@/shared/api';
import { CheckUserReq, CreateUserReq } from '../model';
import axios, { AxiosResponse } from 'axios';
import { SignatureRequest, SignatureResponse } from '@/entities/signature/model';

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

const verifySignatureRequest = async (data: SignatureRequest): Promise<SignatureResponse> => {
  const response = await axios.post<SignatureResponse>('/api/verify-signature', data);
  return response.data;
}

export { checkUser, createUser, verifySignatureRequest };
