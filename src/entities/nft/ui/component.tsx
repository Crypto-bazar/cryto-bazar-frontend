import { FC } from 'react';
import { NFT } from '../types';

type Props = {
  nft: NFT;
};

const NFTCard: FC<Props> = ({ nft }) => {
  return (
    <div className='rounded-lg border p-4 shadow-lg'>
      {/* <Image src={nft.image} alt={nft.name} className='mb-4 h-48 w-full rounded object-cover' /> */}
      <h2 className='mb-2 text-xl font-bold'>{nft.Name}</h2>
      <p className='mb-2 text-gray-700'>{nft.Description}</p>
      <p className='font-semibold text-gray-900'>Цена: {nft.Price} ETH</p>
    </div>
  );
};

export { NFTCard };
