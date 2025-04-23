'use client';

import { useParams } from 'next/navigation';
import { useStore } from '@tanstack/react-store';
import { nftStore } from 'entities/nft/models';
import Image from 'next/image';

const NFTDetailPage = () => {
  const { id } = useParams();
  const nftId = Number(id);

  const nft = useStore(nftStore, (state) => state.items.find((nft) => nft.id === nftId));

  if (!nft)
    return (
      <div className='flex min-h-screen items-center justify-center bg-white'>
        <div className='text-xl font-medium text-red-500'>NFT не найден</div>
      </div>
    );

  // Форматирование цены и голосов
  const formattedPrice = nft.price ? `${Number(nft.price) / 1e18} ETH` : 'Не указана';
  const formattedVotes = nft.votes_amount ? `${Number(nft.votes_amount)}` : '0';

  return (
    <div className='min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-6xl'>
        <div className='flex flex-col gap-12 md:flex-row'>
          {/* NFT Image */}
          <div className='w-full md:w-1/2'>
            <div className='overflow-hidden rounded-3xl border border-gray-100 shadow-xl'>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}uploads/${nft.image_path}`}
                alt={nft.name}
                width={600}
                height={600}
                className='aspect-square h-auto w-full object-cover'
                priority
              />
            </div>

            {/* Token Metadata */}
            <div className='mt-6 rounded-xl bg-gray-50 p-6'>
              <h3 className='mb-4 text-lg font-semibold text-gray-900'>Метаданные токена</h3>
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Token ID:</span>
                  <span className='font-medium'>{nft.token_id}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Token URI:</span>
                  <span className='break-all text-right font-medium'>{nft.token_uri}</span>
                </div>
              </div>
            </div>
          </div>

          {/* NFT Details */}
          <div className='w-full space-y-6 md:w-1/2'>
            <div className='space-y-4'>
              <h1 className='text-4xl font-bold text-gray-900'>{nft.name}</h1>

              <div className='flex items-center space-x-2'>
                <span className='text-gray-500'>Владелец ID:</span>
                <span className='rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700'>
                  {nft.owner_id}
                </span>
              </div>

              <div className='prose max-w-none text-gray-600'>
                <h3 className='text-lg font-semibold text-gray-900'>Описание</h3>
                <p className='leading-relaxed'>{nft.description || 'Описание отсутствует'}</p>
              </div>
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='rounded-xl bg-gray-50 p-4'>
                <p className='text-sm text-gray-500'>ID NFT</p>
                <p className='font-medium'>{nft.id}</p>
              </div>
              <div className='rounded-xl bg-gray-50 p-4'>
                <p className='text-sm text-gray-500'>ID предложения</p>
                <p className='font-medium'>{nft.proposal_id || '—'}</p>
              </div>
              <div className='rounded-xl bg-gray-50 p-4'>
                <p className='text-sm text-gray-500'>Статус</p>
                <p className='font-medium'>
                  {nft.proposed ? (
                    <span className='text-blue-600'>Предложено</span>
                  ) : (
                    <span className='text-gray-600'>Не предложено</span>
                  )}
                </p>
              </div>
              <div className='rounded-xl bg-gray-50 p-4'>
                <p className='text-sm text-gray-500'>Голосов</p>
                <p className='font-medium'>{formattedVotes}</p>
              </div>
            </div>

            <div className='border-t border-gray-200 pt-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-500'>Текущая цена</p>
                  <p className='text-3xl font-bold text-green-600'>{formattedPrice}</p>
                </div>
                <div className='space-x-3'>
                  <button className='rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:from-green-600 hover:to-emerald-700'>
                    Купить
                  </button>
                  {nft.proposed && (
                    <button className='rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-700'>
                      Голосовать
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Actions */}
            <div className='flex space-x-3 pt-4'>
              <button className='font-medium text-gray-700 hover:text-gray-900'>
                <span className='flex items-center'>
                  <svg className='mr-2 h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                    />
                  </svg>
                  В избранное
                </span>
              </button>
              <button className='font-medium text-gray-700 hover:text-gray-900'>
                <span className='flex items-center'>
                  <svg className='mr-2 h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
                    />
                  </svg>
                  Поделиться
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetailPage;
