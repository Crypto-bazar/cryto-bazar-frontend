import { Store } from '@tanstack/react-store';
import { NFT } from './types';

type NFTState = {
  items: NFT[];
  selectedNFT: NFT | null;
  salesItems: NFT[];
  userItems: NFT[];
  favourites: NFT[];
};

const initialState: NFTState = {
  items: [],
  selectedNFT: null,
  salesItems: [],
  userItems: [],
  favourites: [],
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

  setSalesNFTs: (nfts: NFT[]) => {
    nftStore.setState((prev) => ({ ...prev, salesItems: nfts }));
  },

  updateNFT: (updatedNFT: NFT) => {
    nftStore.setState((state) => ({
      ...state,
      items: state.items.map((nft) => (nft.id === updatedNFT.id ? updatedNFT : nft)),
    }));
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

export const userNFTActions = {
  setNFTs: (nfts: NFT[]) => {
    nftStore.setState((prev) => ({ ...prev, userItems: nfts }));
  },

  addNFT: (nft: NFT) => {
    nftStore.setState((prev) => ({ ...prev, userItems: [...prev.items, nft] }));
  },
};

export type { NFTState };
