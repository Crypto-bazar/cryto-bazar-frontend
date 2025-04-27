import { axiosInstance } from 'shared/api';
import { Comment, CommentCreate } from '../models';
import { AxiosResponse } from 'axios';
import { commentActions } from '../models/store';

const getComments = async (tokenId: number): Promise<Comment[]> => {
  try {
    const response = await axiosInstance.get<Comment[]>(`/api/v1/comments/${tokenId}`);
    if (response.status === 200) {
      commentActions.setComments(response.data);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

const createComment = async (data: CommentCreate): Promise<Comment | null> => {
  try {
    const response = await axiosInstance.post<CommentCreate, AxiosResponse<Comment>>(`/api/v1/comments/`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    return null;
  }
};

export { getComments, createComment };
