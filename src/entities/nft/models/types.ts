type NFT = {
  id: number;
  token_id: number;
  in_sales: boolean;
  proposal_id: number;
  token_uri: string;
  name: string;
  description: string;
  price: string;
  owner: string;
  image_path: string;
  proposed: boolean;
  votes_amount: string;
};

export type { NFT };
