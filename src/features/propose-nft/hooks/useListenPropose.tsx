import { useRef, useState } from 'react';
import { Log } from 'viem';
import { useWatchContractEvent } from 'wagmi';
import { abi } from 'shared/models';
import { EventPropose } from '../models';

const useListenPropose = () => {
  const [data, setData] = useState<EventPropose | null>(null);
  const prevDataRef = useRef<Log[]>([]);

  useWatchContractEvent({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    eventName: 'NFTMinted',
    poll: false,
    onLogs(logs) {
      const returnData: EventPropose = {
        owner: logs[0].args.owner,
        tokenUri: logs[0].args.tokenURI,
        tokenId: logs[0].args.tokenId,
      };
      console.table(returnData);
      setData(returnData);
      prevDataRef.current = logs;
    },
  });

  return { data };
};

export { useListenPropose };
