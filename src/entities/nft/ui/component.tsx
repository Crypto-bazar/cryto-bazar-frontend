import { FC } from 'react';
import { NFT } from '../models/types';
import Image from 'next/image';
import { Button } from '@/shared/ui/button/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card/ui';

type Props = {
  nft: NFT;
  onCreate: (id: number, name: string, symb: string, uri: string) => void;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const NFTCard: FC<Props> = ({ nft, onCreate }) => {
  return (
    <Card className='shadow-lg'>
      <CardHeader>
        <Image
          width={200}
          height={200}
          src={`${apiUrl}uploads/${nft.image_path}`}
          alt={nft.name}
          className='mb-4 h-48 w-full rounded object-cover'
        />
        <CardTitle>{nft.name}</CardTitle>
        <CardDescription>{nft.token_id && 'Токенезирован'}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='mb-2 text-gray-700'>{nft.description}</p>
        <p className='font-semibold text-gray-900'>Цена: {parseFloat(nft.price)} ETH</p>
        {nft.token_id === '' && (
          <Button
            className='mt-2'
            onClick={() => onCreate(nft.id, nft.name, nft.symbol, `${apiUrl}uploads/${nft.image_path}`)}
          >
            Токенезировать
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export { NFTCard };
