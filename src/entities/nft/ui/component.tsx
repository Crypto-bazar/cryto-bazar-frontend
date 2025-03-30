import { FC, ReactNode } from 'react';
import { NFT } from '../models/types';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'shared/ui/card';

type Props = {
  nft: NFT;
  children: ReactNode;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const NFTCard: FC<Props> = ({ nft, children }) => {
  return (
    <Card className='border-2 border-[#2e4756] bg-[#16262e] text-[#9fa2b2] shadow-lg shadow-[#2e4756]'>
      <CardHeader>
        <Image
          width={200}
          height={200}
          src={`${apiUrl}uploads/${nft.image_path}`}
          alt={nft.name}
          className='mb-4 h-48 w-full rounded object-cover'
        />
        <CardTitle className='text-[#3c7a89]'>{nft.name}</CardTitle>
        <CardDescription>{nft.token_id !== 0 ? 'Токенизировать' : 'Не токенизирован'}</CardDescription>
        <CardDescription>Id токена: {nft.token_id}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='mb-2 text-[#9fa2b2]'>{nft.description}</p>
        {children}
      </CardContent>
    </Card>
  );
};

export { NFTCard };
