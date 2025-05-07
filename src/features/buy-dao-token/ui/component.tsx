import { Button } from 'shared/ui/button';
import { FC } from 'react';
import { useBuyDaoToken } from 'features/buy-dao-token/hooks';
import { parseEther } from 'viem';

type Props = {
  amount: string;
};

const BuyDaoToken: FC<Props> = ({ amount }) => {
  const { buyDAOWithApprove, isLoading, isSuccess } = useBuyDaoToken();

  const handleBuy = async () => {
    await buyDAOWithApprove(parseEther(amount));
  };

  return (
    <Button onClick={handleBuy} disabled={isLoading} className='w-full py-6 text-lg' size='lg'>
      {isLoading ? 'Подтверждение транзакции...' : isSuccess ? 'Покупка завершена' : 'Купить DAO токены'}
    </Button>
  );
};

export { BuyDaoToken };
