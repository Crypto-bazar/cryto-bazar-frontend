import { notFound } from 'next/navigation';

import { Share2, Heart } from 'lucide-react';
import { NFTImage } from 'entities/nft/ui';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/ui/card';
import { NFTInfo } from 'entities/nft/ui/nft-info';
import { NFTAttributes } from 'widgets/nft-attributes/ui';
import { Button } from 'shared/ui/button';
import { getNFTById } from 'entities/nft/api';

export default async function NFTDetailPage({ params }: { params: { id: string } }) {
  const nft = await getNFTById(params.id);

  if (!nft) return notFound();

  const formattedPrice = nft.price ? `${Number(nft.price) / 1e18} ETH` : 'Не указана';
  const formattedVotes = nft.votes_amount ? `${Number(nft.votes_amount) / 1e18}` : '0';

  const attributes = [
    { label: 'ID токена', value: nft.token_id },
    { label: 'ID предложения', value: nft.proposal_id || '—' },
    { label: 'Статус', value: nft.proposed ? 'Предложен' : 'Не предложен' },
    { label: 'Голоса', value: nft.votes_amount ? formattedVotes : '0' },
  ];

  return (
    <div className='container mx-auto py-8'>
      <div className='grid gap-8 md:grid-cols-2'>
        <div className='space-y-6'>
          <NFTImage imageUrl={`${process.env.NEXT_PUBLIC_API_URL}uploads/${nft.image_path}`} name={nft.name} />

          <Card>
            <CardHeader>
              <CardTitle>Метаданные токена</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>URI токена:</span>
                  <span className='font-mono text-sm'>{nft.token_uri}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='space-y-6'>
          <NFTInfo name={nft.name} ownerId={nft.owner_id} description={nft.description} />

          <NFTAttributes attributes={attributes} />

          <div className='flex gap-4'>
            <Button variant='outline' size='sm'>
              <Heart className='mr-2 h-4 w-4' />В избранное
            </Button>
            <Button variant='outline' size='sm'>
              <Share2 className='mr-2 h-4 w-4' />
              Поделиться
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
