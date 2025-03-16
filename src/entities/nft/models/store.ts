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
  }
}
