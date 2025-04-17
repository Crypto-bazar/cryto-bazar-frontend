import { Store } from '@tanstack/react-store';
import { NFT } from './types';

type NFTState = {
  items: NFT[];
  selectedNFT: NFT | null;
  userItems: NFT[];
};

const initialState: NFTState = {
  items: [],
  selectedNFT: null,
  userItems: [],
};

export const nftStore = new Store<NFTState>(initialState);

//TODO add types
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  (window as any).store = nftStore;
}

export const nftActions = {
  setNFTs: (nfts: NFT[]) => {
    nftStore.setState((prev) => ({ ...prev, items: nfts }));
  },

  selectNFT: (nft: NFT) => {
    nftStore.setState((prev) => ({ ...prev, selectedNFT: nft }));
  },

  clearSelection: () => {
    nftStore.setState((prev) => ({ ...prev, selectedNFT: null }));
  },

  addNFT: (nft: NFT) => {
    nftStore.setState((prev) => ({ ...prev, items: [...prev.items, nft] }));
  },

  changeTokenId: (tokenUri: string, tokenId: number) => {
    nftStore.setState((prev) => ({
      ...prev,
      items: prev.items.map((nft) => (nft.token_uri === tokenUri ? { ...nft, token_id: tokenId } : nft)),
    }));
  },

  updateProposedNFT: (tokenURI: string, proposed: boolean) => {
    nftStore.setState((prev) => ({
      ...prev,
      items: prev.items.map((nft) => (nft.token_uri === tokenURI ? { ...nft, proposed: proposed } : nft)),
    }));
  },

  changeTokenPrice: (tokenId: bigint, tokenPrice: bigint) => {
    nftStore.setState((prev) => ({
      ...prev,
      items: prev.items.map((nft) =>
        nft.token_id === Number(tokenId) ? { ...nft, price: tokenPrice.toString() } : nft,
      ),
    }));
  },
};

export const userNFTActions = {
  setNFTs: (nfts: NFT[]) => {
    nftStore.setState((prev) => ({ ...prev, userItems: nfts }));
  },

  addNFT: (nft: NFT) => {
    nftStore.setState((prev) => ({ ...prev, userItems: [...prev.items, nft] }));
  },
};
