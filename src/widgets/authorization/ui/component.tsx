import { FC } from 'react';
import { AuthForm } from 'features/auth';

const Authorization: FC = () => {
  return (
    <div className='mt-8 flex min-h-screen justify-center bg-primary-peach px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Войдите в свой аккаунт</h2>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export { Authorization };
