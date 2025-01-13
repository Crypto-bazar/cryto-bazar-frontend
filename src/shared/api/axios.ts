import axios from 'axios';
import Cookies from 'js-cookie';
import { headers } from 'next/headers';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

axiosInstance.interceptors.request.use((config) => {
  let token: string | undefined;

  if (typeof window !== 'undefined') {
    token = Cookies.get('token');
  } else {
    const headersList = headers();
    const cookies = headersList.get('cookie') || '';

    token = cookies
      .split(';')
      .find((c) => c.trim().startsWith('token='))
      ?.split('=')[1];
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { axiosInstance };
