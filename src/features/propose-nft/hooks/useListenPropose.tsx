import { useState } from 'react';
import { EventPropose } from '../models';
import { useWatchContractEvent } from 'wagmi';
import { DAOabi } from 'shared/models';

const useListenPropose = () => {
  const [data, setData] = useState<EventPropose | null>(null);

  useWatchContractEvent({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: DAOabi,
    eventName: 'NFTProposed',
    poll: false,
    onLogs(logs) {
      const returnData: EventPropose = {
        proposalId: logs[0].args.proposalId,
        proposer: logs[0].args.proposer,
        tokenUri: logs[0].args.tokenURI,
      };
      console.table(returnData);
      setData(returnData);
    },
  });
  return { data };
};

export { useListenPropose };
