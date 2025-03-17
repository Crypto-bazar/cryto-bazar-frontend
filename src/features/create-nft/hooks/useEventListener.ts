import { abi } from "@/shared/api";
import { useState, useRef } from "react";
import { Log } from "viem";
import { useWatchContractEvent } from "wagmi";

const useEventListener = () => {
  const [data, setData] = useState<Log[]>([]);
  const prevDataRef = useRef<Log[]>([]);

  useWatchContractEvent({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    eventName: "TokenMinted",
    onLogs(logs) {
      if (prevDataRef.current.length > 0 && prevDataRef.current[0].blockHash === logs[0].blockHash) {
        return;
      }
      setData(logs);
      prevDataRef.current = logs;
    },
  });

  return { data };
};

export { useEventListener };
