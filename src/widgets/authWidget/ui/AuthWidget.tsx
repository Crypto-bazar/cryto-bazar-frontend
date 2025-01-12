import { FC } from 'react';
import { AuthForm } from 'features/auth';

export const AuthWidget: FC = () => {
  return (
    <div className='flex min-h-screen mt-8 justify-center bg-primary-peach px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Войдите в свой аккаунт</h2>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};
