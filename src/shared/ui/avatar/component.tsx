import { User } from 'entities/user/models';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

type Props = {
  width: number;
  height: number;
  user: User | null;
  address: string | undefined;
};

const Avatar: FC<Props> = ({ height, width, address, user }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!user?.avatar_url || !address) return null;

  const avatarSize = `${Math.max(width, height) * 4}px`;

  return (
    <Link href='/profile' aria-label='Профиль'>
      <div
        className='overflow-hidden rounded-full border border-white/35 transition-all duration-200 hover:ring-2 hover:ring-cyan-300'
        style={{ width: avatarSize, height: avatarSize }}
      >
        <Image
          src={`${apiUrl ?? ''}${user.avatar_url}`}
          alt='Аватар'
          width={40}
          height={40}
          className='h-full w-full object-cover'
        />
      </div>
    </Link>
  );
};

export { Avatar };
