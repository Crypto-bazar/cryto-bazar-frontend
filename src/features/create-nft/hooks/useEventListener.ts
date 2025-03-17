import { abi } from "@/shared/api";
import { useState, useRef } from "react";
import { Log } from "viem";
import { useWatchContractEvent } from "wagmi";
import { EventMintedData } from "../model";

const useEventListener = () => {
  const [data, setData] = useState<EventMintedData | null>(null)
  const prevDataRef = useRef<Log[]>([]);

  useWatchContractEvent({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    eventName: "TokenMinted",
    onLogs(logs) {
      if (prevDataRef.current.length > 0 && prevDataRef.current[0].blockHash === logs[0].blockHash) {
        return;
      }

      const returnedData: EventMintedData = {
        owner: logs[0].args.owner,
        tokenId: logs[0].args.tokenId,
        tokenURI: logs[0].args.tokenURI

      }

      setData(returnedData);
      prevDataRef.current = logs;
    },
  });

  return { data };
};

export { useEventListener };
