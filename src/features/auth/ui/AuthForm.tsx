'use client';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { AuthFormValues } from '../model/types';
import { authApi } from '../api/api';

export const AuthForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>();

  const onSubmit = async (data: AuthFormValues) => {
    try {
      await authApi.login(data);
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md space-y-4'>
      <div>
        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
          Email
        </label>
        <input
          {...register('email', {
            required: 'Email обязателен',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Неверный формат email',
            },
          })}
          type='email'
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500'
        />
        {errors.email && <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
          Пароль
        </label>
        <input
          {...register('password', {
            required: 'Пароль обязателен',
            minLength: {
              value: 6,
              message: 'Минимальная длина пароля 6 символов',
            },
          })}
          type='password'
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500'
        />
        {errors.password && <p className='mt-1 text-sm text-red-600'>{errors.password.message}</p>}
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full rounded-md bg-primary-orange px-4 py-2 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50'
      >
        {isSubmitting ? 'Вход...' : 'Войти'}
      </button>
    </form>
  );
};
