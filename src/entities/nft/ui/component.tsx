import { FC } from 'react';
import { NFT } from '../models/types';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'shared/ui/card';
import { formatUnits } from 'viem';
import { ThumbsUp, AlertCircle } from 'lucide-react';

type Props = {
  nft: NFT;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const NFTCard: FC<Props> = ({ nft }) => {
  const votes = BigInt(nft.votes_amount);
  const formattedVotes = formatUnits(votes, 18);

  const hasVotes = votes > 0n;

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
        <CardDescription className={nft.token_id !== 0 ? 'font-medium text-green-600' : 'font-medium text-red-600'}>
          {nft.token_id !== 0 ? 'Выпущен' : 'Не токенизирован'}
        </CardDescription>
        <CardDescription>Id токена: {nft.token_id}</CardDescription>
      </CardHeader>

      <CardContent>
        <div
          className={`mb-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold shadow-sm ${
            hasVotes ? 'bg-blue-50 text-blue-700' : 'border border-red-300 bg-red-50 text-red-700'
          }`}
        >
          {hasVotes ? <ThumbsUp className='h-5 w-5 text-blue-500' /> : <AlertCircle className='h-5 w-5 text-red-500' />}
          {hasVotes ? `Проголосовали: ${formattedVotes}` : 'Пока никто не голосовал'}
        </div>

        <p className='mb-2 text-[#9fa2b2]'>{nft.description}</p>
      </CardContent>
    </Card>
  );
};

export { NFTCard };
