'use client';

import { Share2, MessageSquare } from 'lucide-react';
import { NFTImage } from 'entities/nft/ui';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/ui/card';
import { NFTInfo } from 'entities/nft/ui/nft-info';
import { NFTAttributes } from 'widgets/nft-attributes/ui';
import { Button } from 'shared/ui/button';
import { getFavouriteNFTs } from 'entities/nft/api';
import { Vote } from 'features/vote-nft/ui';
import { useEffect, useState } from 'react';
import { nftStore } from 'entities/nft/models';
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
import { AddFavouriteButton } from 'features/add-favourite/ui';
import { RemoveFavouriteButton } from 'features/remove-favourite/ui';
import { useGetAllNFTs } from 'entities/nft/hooks/hooks';
import { useGetVoteNFT } from 'features/vote-nft/hooks';
import { useGetRequiredVotes } from 'features/required-votes/hooks';

export default function NFTDetailPage({ params }: { params: { id: string } }) {
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const { address } = useAccount();
  const { refetch } = useGetAllNFTs();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const user = useStore(userStore, (state) => state.item);
  const favourites = useStore(nftStore, (state) => state.favourites);
  const comments = useStore(commentStore, (state) => state.items);
  const { data: voted } = useGetVoteNFT(BigInt(params.id));
  const { requiredVotes } = useGetRequiredVotes();

  const nft = useStore(nftStore, (state) => state.items[Number(params.id)]);
  const isNFTLoaded = Boolean(nft);

  useEffect(() => {
    if (voted !== undefined) {
      setHasVoted(Boolean(voted));
    }
  }, [voted]);

  useEffect(() => {
    if (address) {
      getFavouriteNFTs(address);
    }
  }, [address]);

  useEffect(() => {
    if (!nft || !favourites) return;
    const result = favourites.some((fav) => fav.id === nft.id);
    setIsFavourite(result);
  }, [favourites, nft, nft?.id]);

  useEffect(() => {
    if (nft?.id !== undefined) {
      getComments(Number(nft.id));
    }
  }, [nft?.id]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !address || !nft) return;

    setIsLoading(true);
    try {
      const data: CommentCreate = {
        content: newComment,
        owner_address: address,
        token_id: Number(nft.id),
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

  if (!isNFTLoaded) {
    return <div className='container mx-auto py-8 text-center text-muted-foreground'>Загрузка токена...</div>;
  }

  const formattedPrice = nft.price ? `${Number(nft.price) / 1e18} ETH` : 'Не указана';
  const formattedVotes = nft.votes ? `${Number(nft.votes) / 1e18}` : '0';
  const priceInWei = nft.price ? BigInt(Math.floor(Number(nft.price) * 1e18)) : BigInt(0);

  const attributes = [
    { label: 'ID токена', value: nft.tokenId !== 0n ? Number(nft.tokenId) : '—' },
    {
      label: 'Статус',
      value: nft.minted ? 'Выпущен' : 'В голосовании',
    },
    { label: `Голоса`, value: nft.votes ? `${formattedVotes} / ${requiredVotes}` : '0' },
  ];

  return (
    <div className='container mx-auto py-8'>
      <div className='grid gap-8 md:grid-cols-2'>
        <div className='space-y-6'>
          <NFTImage imageUrl={`/uploads/${nft.imagePath}`} name={nft.name} />

          <Card>
            <CardHeader>
              <CardTitle>Метаданные токена</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                {nft.forSale && (
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

          <div className='flex flex-wrap gap-4'>
            <RemoveFavouriteButton address={address} id={Number(nft.id)} isFavourite={isFavourite} />
            <AddFavouriteButton address={address} id={Number(nft.id)} isFavourite={isFavourite} />
            <Button variant='outline' size='sm'>
              <Share2 className='mr-2 h-4 w-4' />
              Поделиться
            </Button>

            {address && !hasVoted && (
              <Vote
                address={address}
                tokenOwner={nft.owner}
                proposeId={Number(nft.proposalId)}
                onSuccess={() => {
                  refetch();
                  setHasVoted(true);
                }}
              />
            )}

            {nft.tokenId !== 0n && !nft.forSale && address === nft.owner && <SellNFT tokenId={Number(nft.id)} />}
            {nft.forSale && address && nft.owner !== address && <BuyNFTButton tokenId={nft.id} price={priceInWei} />}
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
