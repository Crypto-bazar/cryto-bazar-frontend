import { User } from 'entities/user/models';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

type Props = {
  width: number;
  height: number;
  user: User;
  address: string | undefined;
};

const Avatar: FC<Props> = ({ height, width, address, user }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return (
    <>
      {user?.avatar_url && address && (
        <Link href='/profile'>
          <div
            className={`h-[${height}] w-${width} overflow-hidden rounded-full border border-white transition-all duration-200 hover:ring-2 hover:ring-[#3c7a89]`}
          >
            <Image
              src={`${apiUrl}${user.avatar_url}`}
              alt='Аватар'
              width={40}
              height={40}
              className='h-full w-full object-cover'
            />
          </div>
        </Link>
      )}
    </>
  );
};

export { Avatar };
