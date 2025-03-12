type CreateNFTRequest = {
  token_id: string;
  name: string;
  symbol: string;
  description: string;
  price: string;
  owner_address: string;
  image: File;
};

export type { CreateNFTRequest };
