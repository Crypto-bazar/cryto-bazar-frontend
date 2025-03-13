type CreateNFTRequest = {
  name: string;
  symbol: string;
  description: string;
  price: string;
  owner_address: string;
  image: File;
};

type SetNFTContractAddress = {
  id: number;
  contract_address: `0x${string}` | undefined;
};

export type { CreateNFTRequest, SetNFTContractAddress };
