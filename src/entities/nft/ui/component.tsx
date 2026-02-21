import { FC } from 'react';
import { NFT } from '../models/types';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'shared/ui/card';
import { formatUnits } from 'viem';
import { ThumbsUp, Info } from 'lucide-react';

type Props = {
  nft: NFT;
};

const NFTCard: FC<Props> = ({ nft }) => {
  const formattedVotes = formatUnits(nft.votes, 18);

  const hasVotes = nft.votes > 0n;

  return (
    <Card className='h-full border border-slate-200 bg-white/90 text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg'>
      <CardHeader className='p-4'>
        <Image
          width={200}
          height={200}
          src={`/uploads/${nft.imagePath}`}
          alt={nft.name}
          className='mb-3 h-48 w-full rounded-lg object-cover'
        />
        <CardTitle className='line-clamp-1 text-lg text-slate-900'>{nft.name}</CardTitle>
        <CardDescription className={nft.minted ? 'font-medium text-emerald-600' : 'font-medium text-sky-600'}>
          {nft.minted ? 'Выпущен' : 'В голосовании'}
        </CardDescription>
        {nft.tokenId !== 0n && <CardDescription className='text-xs text-slate-500'>ID токена: {Number(nft.tokenId)}</CardDescription>}
      </CardHeader>

      <CardContent className='space-y-3 p-4 pt-0'>
        <div
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${
            hasVotes ? 'bg-blue-50 text-blue-700' : 'border border-slate-200 bg-slate-100 text-slate-600'
          }`}
        >
          {hasVotes ? <ThumbsUp className='h-5 w-5 text-blue-500' /> : <Info className='h-5 w-5 text-slate-500' />}
          {hasVotes ? `Проголосовали: ${formattedVotes}` : 'Пока никто не голосовал'}
        </div>

        <p className='line-clamp-3 text-sm leading-relaxed text-slate-600'>{nft.description}</p>
      </CardContent>
    </Card>
  );
};

export { NFTCard };
