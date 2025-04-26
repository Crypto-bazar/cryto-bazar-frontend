import { useState } from 'react';
import { useWatchContractEvent } from 'wagmi';
import { DAOabi } from 'shared/models';
import { EventMinted } from '../models';

const useListenMinted = () => {
  const [data, setData] = useState<EventMinted | null>(null);

  useWatchContractEvent({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: DAOabi,
    eventName: 'NFTMinted',
    poll: false,
    onLogs(logs) {
      const returnData: EventMinted = {
        owner: logs[0].args.owner,
        tokenUri: logs[0].args.tokenURI,
        tokenId: logs[0].args.tokenId,
      };
      setData(returnData);
    },
  });

  return { data };
};

export { useListenMinted };
