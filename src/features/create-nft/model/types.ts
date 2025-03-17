type CreateNFTRequest = {
  name: string;
  description: string;
  price: string;
  owner_address: string;
  image: File;
};

type SetNFTContractAddress = {
  id: number;
  contract_address: `0x${string}` | undefined;
};

type EventMintedData = { tokenId: bigint | undefined; owner: string | undefined; tokenURI: string | undefined }

export type { CreateNFTRequest, SetNFTContractAddress, EventMintedData };
