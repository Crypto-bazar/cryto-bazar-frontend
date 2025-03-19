import { useRef, useState } from "react"
import { EventSellData } from "../model"
import { Log } from "viem"
import { useWatchContractEvent } from "wagmi"
import { abi } from "@/shared/models"

const useListenSell = () => {
  const [data, setData] = useState<EventSellData | null>(null)
  const prevDataRef = useRef<Log[]>([])

  useWatchContractEvent({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    eventName: "TokenListedForSale",
    onLogs(logs) {
      if (prevDataRef.current.length > 0 && prevDataRef.current[0].blockHash === logs[0].blockHash) {
        return;
      }
      const returnData: EventSellData = {
        price: logs[0].args.price,
        seller: logs[0].args.seller,
        tokenId: logs[0].args.tokenId
      }

      setData(returnData)
      prevDataRef.current = logs;

    }

  })

  return { data }
}

export { useListenSell }
