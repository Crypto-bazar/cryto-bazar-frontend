import { Store } from '@tanstack/react-store';
import { NFT } from './types';

type NFTState = {
  items: NFT[];
  selectedNFT: NFT | null;
  salesItems: NFT[];
  userItems: NFT[];
  favourites: NFT[];
};

declare global {
  interface Window {
    nftStore: Store<NFTState>;
  }
}

const initialState: NFTState = {
  items: [],
  selectedNFT: null,
  salesItems: [],
  userItems: [],
  favourites: [],
};

export const nftStore = new Store<NFTState>(initialState);

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  window.nftStore = nftStore;
}

export const nftActions = {
  setNFTs: (nfts: NFT[]) => {
    nftStore.setState((prev) => ({ ...prev, items: nfts }));
  },

  setSalesNFTs: (nfts: NFT[]) => {
    nftStore.setState((prev) => ({ ...prev, salesItems: nfts }));
  },

  updateNFT: (updatedNFT: NFT) => {
    nftStore.setState((state) => ({
      ...state,
      items: state.items.map((nft) => (nft.id === updatedNFT.id ? updatedNFT : nft)),
    }));
  },

  setFavourites: (favourites: NFT[]) => {
    nftStore.setState((prev) => ({ ...prev, favourites }));
  },
  addFavouriteNFT: (nft: NFT) => {
    nftStore.setState((prev) => ({ ...prev, favourites: [...prev.favourites, nft] }));
  },
  removeFavouriteNFT: (nft: NFT) => {
    nftStore.setState((prev) => ({
      ...prev,
      favourites: prev.favourites.filter((item) => item.token_id !== nft.token_id),
    }));
  },
};

export type { NFTState };
