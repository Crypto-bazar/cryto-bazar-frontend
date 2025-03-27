import { NFT } from 'entities/nft/models';
import { http, HttpResponse } from 'msw';

const nfts: NFT[] = [
  {
    id: 1,
    name: 'CryptoKitty',
    description: 'A unique digital cat',
    price: '0.05',
    image_path: 'https://example.com/images/cryptokitty.png',
    token_id: 101,
    owner_id: 1001,
    token_uri: 'https://example.com/nft/cryptokitty',
  },
  {
    id: 2,
    name: 'Digital Art Piece',
    description: 'A beautiful piece of digital art',
    price: '1.25',
    image_path: 'https://example.com/images/digitalart.png',
    token_id: 102,
    owner_id: 1002,
    token_uri: 'https://example.com/nft/digitalart',
  },
  {
    id: 3,
    name: 'Virtual Real Estate',
    description: 'A plot of virtual land',
    price: '10.00',
    image_path: 'https://example.com/images/virtualrealestate.png',
    token_id: 103,
    owner_id: 1003,
    token_uri: 'https://example.com/nft/virtualrealestate',
  },
];

export const handlers = [
  http.post('/api/v1/nfts/', () => {
    return HttpResponse.json(nfts);
  }),
];
