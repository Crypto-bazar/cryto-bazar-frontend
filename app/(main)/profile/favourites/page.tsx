import { FavouriteNFTs } from 'widgets/favourite-nfts/ui';

export default function FavouritesPage() {
  return (
    <div>
      <h1 className='mb-4 text-2xl font-semibold'>Избранные NFT</h1>
      <FavouriteNFTs />
    </div>
  );
}
