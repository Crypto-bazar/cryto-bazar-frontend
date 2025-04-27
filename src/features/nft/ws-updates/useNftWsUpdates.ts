import { nftActions } from 'entities/nft/models';
import { useEffect } from 'react';
import { connectWS } from 'shared/api/ws';

const useNftWsUpdates = () => {
  useEffect(() => {
    const ws = connectWS();
    if (!ws) return;

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type && message.nft) {
          switch (message.type) {
            case 'vote':
            case 'proposed':
            case 'minted':
            case 'sale':
            case 'sold':
              nftActions.updateNFT(message.nft);
              break;
            default:
              console.log('Unknown message type:', message.type);
          }
        }
      } catch (error) {
        console.error('Error processing WS message:', error);
      }
    };
  }, []);
};

export { useNftWsUpdates };
