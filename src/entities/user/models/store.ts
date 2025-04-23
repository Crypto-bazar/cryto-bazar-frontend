import { User } from 'entities/user/models/types';
import { Store } from '@tanstack/react-store';

type UserState = {
  item: User | null;
};

const initialState: UserState = {
  item: null,
};

export const userStore = new Store<UserState>(initialState);

//TODO add types
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  (window as any).store = userStore;
}

export const userActions = {
  setUser: (data: User) => {
    userStore.setState(() => ({ item: data }));
  },

  clearUser: () => {
    userStore.setState(() => ({ item: null }));
  },

  updateAvatar: (avatarUrl: string) => {
    userStore.setState((prev) => ({
      item: {
        ...(prev.item as User),
        avatar_url: avatarUrl,
      },
    }));
  },
};
