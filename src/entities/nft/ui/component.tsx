import { FC, ReactNode } from 'react';
import { NFT } from '../models/types';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'shared/ui/card';
import { formatUnits } from 'viem';

type Props = {
  nft: NFT;
  children?: ReactNode;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const NFTCard: FC<Props> = ({ nft, children }) => {
  return (
    <Card className='border-2 border-[#c1c1c1] bg-[#fff] text-[#9fa2b2] shadow-lg shadow-[#c1c1c1]'>
      <CardHeader>
        <Image
          width={200}
          height={200}
          src={`${apiUrl}uploads/${nft.image_path}`}
          alt={nft.name}
          className='mb-4 h-48 w-full rounded object-cover'
        />
        <CardTitle className='text-[#000000]'>{nft.name}</CardTitle>
        <CardDescription>{nft.token_id !== 0 ? 'Токенизировать' : 'Не токенизирован'}</CardDescription>
        <CardDescription>Id токена: {nft.token_id}</CardDescription>
        <CardDescription>Кол-во проглосовавших: {formatUnits(BigInt(nft.votes_amount), 18)}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='mb-2 text-[#9fa2b2]'>{nft.description}</p>
        {children}
      </CardContent>
    </Card>
  );
};

export { NFTCard };
