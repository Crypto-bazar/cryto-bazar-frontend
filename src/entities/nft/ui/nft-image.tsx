// entities/nft/ui/nft-image.tsx

import Image from 'next/image';
import { Card } from 'shared/ui/card';

const NFTImage = ({ imageUrl, name }: { imageUrl: string; name: string }) => (
  <Card className='overflow-hidden'>
    <Image src={imageUrl} alt={name} width={600} height={600} className='aspect-square w-full object-cover' priority />
  </Card>
);

export { NFTImage };
