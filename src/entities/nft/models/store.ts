import { Store } from "@tanstack/react-store"
import { NFT } from "./types"

type NFTState = {
  items: NFT[],
  selectedNFT: NFT | null,
}

const initialState: NFTState = {
  items: [],
  selectedNFT: null,
}

export const nftStore = new Store<NFTState>(initialState)

export const nftActions = {
  setNFTs: (nfts: NFT[]) => {
    nftStore.setState((prev) => ({ ...prev, items: nfts }))
  },
  selectNFT: (nft: NFT) => {
    nftStore.setState((prev) => ({ ...prev, selectedNFT: nft }))
  },
  clearSelection: () => {
    nftStore.setState((prev) => ({ ...prev, selectedNFT: null }))
  },
  addNFT: (nft: NFT) => {
    nftStore.setState((prev) => ({ ...prev, items: [...prev.items, nft] }))
  },
  changeTokenId: (tokenUri: string, tokenId: number) => {
    nftStore.setState((prev) => ({
      ...prev,
      items: prev.items.map((nft) =>
        nft.token_uri === tokenUri ? { ...nft, token_id: tokenId } : nft
      ),
    }));
  },
  changeTokenPrice: (tokenId: bigint, tokenPrice: bigint) => {
    nftStore.setState((prev) => ({
      ...prev,
      items: prev.items.map((nft) => nft.price === String(tokenId) ? { ...nft, tokenPrice: tokenPrice } : nft)
    }))
  }
}
