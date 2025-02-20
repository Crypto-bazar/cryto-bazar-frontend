'use client';
import { FC } from 'react';
import { LOGIN_REGEX, PASSWORD_REGEX } from 'features/auth/model/types';
import { useForm } from 'react-hook-form';
import { REGEX_PHONE, RegisterFormValues } from 'features/registration/model/types';

const RegistrationForm: FC = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: RegisterFormValues) => {
    console.log(data);
  };

  const password = watch('password');
  //TODO Добавить библиотеку yarn add react-input-mask
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
              message: 'Введите корректный логин',
            },
          })}
          type='text'
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500'
        />
        {errors.login && <p className='mt-1 text-sm text-red-600'>{errors.login.message}</p>}
      </div>
      <div>
        <label htmlFor='login' className='block text-sm font-medium text-gray-700'>
          Номер телефона
        </label>
        <InputMask
          mask='+7 (999) 999-99-99'
          {...register('login', {
            required: 'Логин обязателен',
            pattern: {
              value: REGEX_PHONE,
              message: 'Введите корректный номер',
            },
          })}
        >
          {(inputProps) => (
            <input
              {...inputProps}
              type='tel'
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500'
            />
          )}
        </InputMask>
        {errors.login && <p className='mt-1 text-sm text-red-600'>{errors.login.message}</p>}
      </div>

      <div>
        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
          Почта
        </label>
        <input
          {...register('email', {
            required: 'Почта обязательна',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Введите корректный email',
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
            pattern: {
              value: PASSWORD_REGEX,
              message: 'Пароль должен содержать минимум 8 символов, включая буквы и цифры',
            },
          })}
          type='password'
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500'
        />
        {errors.password && <p className='mt-1 text-sm text-red-600'>{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
          Подтвердите пароль
        </label>
        <input
          {...register('confirmPassword', {
            required: 'Подтверждение пароля обязательно',
            validate: (value) => value === password || 'Пароли не совпадают',
          })}
          type='password'
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500'
        />
        {errors.confirmPassword && <p className='mt-1 text-sm text-red-600'>{errors.confirmPassword.message}</p>}
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full rounded-md bg-primary-orange px-4 py-2 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50'
      >
        {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
};

export { RegistrationForm };
