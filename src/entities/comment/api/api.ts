import { axiosInstance } from 'shared/api';
import { Comment } from '../models';

const getComments = async (tokenId: number): Promise<Comment[]> => {
  try {
    const response = await axiosInstance.get<Comment[]>(`/api/v1/comments/${tokenId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

export { getComments };
