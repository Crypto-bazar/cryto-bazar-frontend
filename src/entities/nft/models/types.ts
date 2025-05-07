type NFT = {
  id: bigint;
  name: string;
  description: string;
  imagePath: string;
  price: bigint;
  owner: `0x${string}`;
  creator: `0x${string}`;
  forSale: boolean;
  isProposal: boolean;
  votes: bigint;
  proposalId: bigint;
  minted: boolean;
  tokenId: bigint;
};

export type { NFT };
