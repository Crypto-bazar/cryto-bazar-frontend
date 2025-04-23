'use client';

import { useEffect } from 'react';
import { getUser } from 'entities/user/api/api';
import { userActions } from 'entities/user/models/store';

const useUser = (address: string) => {
  useEffect(() => {
    (async () => {
      const user = await getUser(address);
      if (!user) return;
      userActions.setUser(user);
    })();
  }, [address]);
};

export { useUser };
