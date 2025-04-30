'use client';

import { notFound } from 'next/navigation';
import { Share2, Heart, MessageSquare } from 'lucide-react';
import { NFTImage } from 'entities/nft/ui';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/ui/card';
import { NFTInfo } from 'entities/nft/ui/nft-info';
import { NFTAttributes } from 'widgets/nft-attributes/ui';
import { Button } from 'shared/ui/button';
import { addFavouriteNFT, getNFTs } from 'entities/nft/api';
import { Vote } from 'features/vote-nft/ui';
import { useEffect, useState } from 'react';
import { nftStore } from 'entities/nft/models';
import { StartVoting } from 'features/propose-nft/ui';
import { useAccount } from 'wagmi';
import { SellNFT } from 'features/sell-nft/ui';
import { BuyNFTButton } from 'features/buy-nft/ui';
import { createComment, getComments } from 'entities/comment/api';
import { CommentCreate } from 'entities/comment/models';
import { Textarea } from 'shared/ui/textarea';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useStore } from '@tanstack/react-store';
import { userStore } from 'entities/user/models/store';
import Image from 'next/image';
import { commentActions, commentStore } from 'entities/comment/models/store';

export default function NFTDetailPage({ params }: { params: { id: string } }) {
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const user = useStore(userStore, (state) => state.item);
  const nfts = useStore(nftStore, (state) => state.items);
  const comments = useStore(commentStore, (state) => state.items);
  const nft = nfts[Number(params.id) - 1];

  useEffect(() => {
    getNFTs().catch(() => notFound());
  }, []);

  useEffect(() => {
    if (nft) {
      getComments(nft.id);
    }
  }, [nfts, nft, params.id]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !address || !nft) return;

    setIsLoading(true);
    try {
      const data: CommentCreate = {
        content: newComment,
        owner_address: address,
        token_id: nft.id,
      };

      const response = await createComment(data);

      if (!response) {
        console.error('Failed to create comment');
        return;
      }

      commentActions.addComment({
        id: response.id,
        nft_id: response.nft_id,
        owner_address: response.owner_address,
        content: response.content,
        created_at: response.created_at,
        avatar_url: user?.avatar_url || '',
      });

      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
                {nft.in_sales && (
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Цена продажи:</span>
                    <span className='font-mono text-sm'>{formattedPrice}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='space-y-6'>
          <NFTInfo name={nft.name} owner={nft.owner} description={nft.description} />

          <NFTAttributes attributes={attributes} />

          <div className='flex gap-4'>
            {address && (
              <Button
                variant='outline'
                size='sm'
                onClick={() => {
                  addFavouriteNFT(address, nft.id);
                }}
              >
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
                {!nft.proposed && address === nft.owner && <StartVoting tokenUri={nft.token_uri} />}
              </>
            )}
            {nft.token_id !== 0 && !nft.in_sales && address && nft.owner === address && (
              <SellNFT tokenId={nft.token_id} />
            )}
            {nft.in_sales && address && <BuyNFTButton tokenId={tokenId} price={priceInWei} />}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <MessageSquare className='h-5 w-5' />
                Комментарии ({comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {address && (
                <div className='space-y-2'>
                  <Textarea
                    placeholder='Напишите ваш комментарий...'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button onClick={handleAddComment} disabled={!newComment.trim() || isLoading}>
                    {isLoading ? 'Отправка...' : 'Отправить'}
                  </Button>
                </div>
              )}

              <div className='space-y-4'>
                {comments.length === 0 ? (
                  <p className='py-4 text-center text-muted-foreground'>Пока нет комментариев</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className='border-b pb-4 last:border-b-0'>
                      <div className='flex items-start justify-between'>
                        <div className='font-medium'>
                          <div className='flex items-center gap-2'>
                            <div className='h-10 w-10 overflow-hidden rounded-full border border-white transition-all duration-200 hover:ring-2 hover:ring-[#3c7a89]'>
                              <Image
                                src={comment.avatar_url ? `${apiUrl}${comment.avatar_url}` : '/default-avatar.png'}
                                alt='Аватар'
                                width={40}
                                height={40}
                                className='h-full w-full object-cover'
                              />
                            </div>
                            {comment.owner_address.slice(0, 6)}...{comment.owner_address.slice(-4)}
                          </div>
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          {formatDistanceToNow(new Date(comment.created_at), {
                            addSuffix: true,
                            locale: ru,
                          })}
                        </div>
                      </div>
                      <p className='mt-1 text-sm'>{comment.content}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
