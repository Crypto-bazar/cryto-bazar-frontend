import { axiosInstance } from 'shared/api';
import { User } from 'entities/user/models';

const getUser = async (address: `0x${string}`) => {
  if (!address) {
    return;
  }
  try {
    const response = await axiosInstance.get<User>(`/api/v1/users/${address}`);
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export { getUser };
