import { axiosInstance } from 'shared/api';
import { User } from 'entities/user/models';

const getUser = async (address: string) => {
  try {
    const response = await axiosInstance.get<User>(`/api/v1/users/${address}`);
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export { getUser };
