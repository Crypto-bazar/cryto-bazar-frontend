import { Button } from 'shared/ui/button';
import { FC } from 'react';
import { useBuyNFTWithApprove } from '../hooks';

type Props = {
  tokenId: bigint;
  price: bigint
};

const BuyNFTButton: FC<Props> = ({ tokenId, price }) => {
  const { buyNFTWithApprove, isLoading, isSuccess } = useBuyNFTWithApprove();

  const handleBuy = async () => {
    await buyNFTWithApprove(tokenId, price);
  };

  return (
    <Button onClick={handleBuy} disabled={isLoading}>
      {isLoading ? 'Подтверждение транзакции...' : isSuccess ? 'Покупка завершена' : 'Купить NFT'}
    </Button>
  );
};

export { BuyNFTButton };
