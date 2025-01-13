import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { AuthFormValues, LOGIN_REGEX, PASSWORD_REGEX } from '../model/types';
import { authApi } from '../api/api';
import Cookies from 'js-cookie';

export const AuthForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>();

  const onSubmit = async (data: AuthFormValues) => {
    try {
      const jwt = await authApi.login(data);
      Cookies.set('token', jwt.token, { expires: 7 });
      console.log('Token saved:', jwt.token);
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md space-y-4'>
      <div>
        <label htmlFor='login' className='block text-sm font-medium text-gray-700'>
          Логин
        </label>
        <input
          {...register('login', {
            required: 'Логин обязателен',
            pattern: {
              value: LOGIN_REGEX,
              message: 'Введите корректный логин'
            }
          })}
          type='text'
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500'
        />
        {errors.login && <p className='mt-1 text-sm text-red-600'>{errors.login.message}</p>}
      </div>

      <div>
        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
          Пароль
        </label>
        <input
          {...register('password', {
            required: 'Пароль обязателен',
            pattern: {
              value: PASSWORD_REGEX,
              message: 'Пароль должен содержать минимум 8 символов, включая буквы и цифры'
            }
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
