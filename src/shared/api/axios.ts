'use client';
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

axiosInstance.interceptors.request.use((config) => {
  let token: string | undefined;

  if (typeof window !== 'undefined') {
    token = Cookies.get('token');
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { axiosInstance };
