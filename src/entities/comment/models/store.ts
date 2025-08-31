import { Store } from '@tanstack/react-store';
import { Comment } from './types';

type CommentState = {
  items: Comment[];
};

const initialState: CommentState = {
  items: [],
};

export const commentStore = new Store<CommentState>(initialState);

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
   (window as any).store = commentStore;
 }

export const commentActions = {
  setComments: (comments: Comment[]) => {
    commentStore.setState((prev) => ({ ...prev, items: comments }));
  },
  addComment: (comment: Comment) => {
    commentStore.setState((prev) => ({ ...prev, items: [...prev.items, comment] }));
  },
  updateComment: (updatedComment: Comment) => {
    commentStore.setState((state) => ({
      ...state,
      items: state.items.map((comment) => (comment.id === updatedComment.id ? updatedComment : comment)),
    }));
  },
  deleteComment: (commentId: number) => {
    commentStore.setState((state) => ({
      ...state,
      items: state.items.filter((comment) => comment.id !== commentId),
    }));
  },
  clearComments: () => {
    commentStore.setState((prev) => ({ ...prev, items: [] }));
  },
};
