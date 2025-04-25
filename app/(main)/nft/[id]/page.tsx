'use client';

import { notFound } from 'next/navigation';

import { Share2, Heart } from 'lucide-react';
import { NFTImage } from 'entities/nft/ui';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/ui/card';
import { NFTInfo } from 'entities/nft/ui/nft-info';
import { NFTAttributes } from 'widgets/nft-attributes/ui';
import { Button } from 'shared/ui/button';
import { getNFTById } from 'entities/nft/api';
import { Vote } from 'features/vote-nft/ui';
import { useEffect, useState } from 'react';
import { NFT } from 'entities/nft/models';
import { StartVoting } from 'features/propose-nft/ui';
import { useAccount } from 'wagmi';
import { SellNFT } from 'features/sell-nft/ui';
import { BuyNFTButton } from 'features/buy-nft/ui';

export default function NFTDetailPage({ params }: { params: { id: string } }) {
  const [nft, setNFT] = useState<NFT | null>(null);
  const { address } = useAccount();

  useEffect(() => {
    (async () => {
      const data = await getNFTById(params.id);
      if (!data) return notFound();
      setNFT(data);
    })();
  }, [params.id]);

  if (!nft) return null;

  const formattedPrice = nft.price ? `${Number(nft.price) / 1e18} ETH` : 'Не указана';
  const formattedVotes = nft.votes_amount ? `${Number(nft.votes_amount) / 1e18}` : '0';

  const priceInWei = nft.price ? BigInt(Math.floor(Number(nft.price) * 1e18)) : BigInt(0);
  const tokenId = BigInt(nft.token_id);

  const attributes = [
    { label: 'ID токена', value: nft.token_id },
    { label: 'ID предложения', value: nft.proposal_id || '—' },
    { label: 'Статус', value: nft.token_id !== 0 ? 'Выпущен' : nft.proposed ? 'Предложен' : 'Не предложен' },
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
          <NFTInfo name={nft.name} owner={nft.owner} description={nft.description} />

          <NFTAttributes attributes={attributes} />

          <div className='flex gap-4'>
            {address && (
              <Button variant='outline' size='sm'>
                <Heart className='mr-2 h-4 w-4' />В избранное
              </Button>
            )}
            <Button variant='outline' size='sm'>
              <Share2 className='mr-2 h-4 w-4' />
              Поделиться
            </Button>
            {nft.token_id === 0 && address && (
              <>
                {nft.proposed && <Vote proposeId={nft.proposal_id} />}
                {!nft.proposed && <StartVoting tokenUri={nft.token_uri} />}
              </>
            )}
            {nft.token_id !== 0 && address && <SellNFT tokenId={nft.token_id} />}
            <BuyNFTButton tokenId={tokenId} price={priceInWei} />
          </div>
        </div>
      </div>
    </div>
  );
}
