type NFT = {
  id: number;
  token_id: number;
  proposal_id: number;
  token_uri: string;
  name: string;
  description: string;
  price: string;
  owner_id: number;
  image_path: string;
  proposed: boolean;
  votes_amount: string;
};

export type { NFT };
