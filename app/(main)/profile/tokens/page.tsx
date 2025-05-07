'use client';
import { ChangeEvent, FC, useState } from 'react';
import { useBuyDaoToken } from 'features/buy-dao-token/hooks';
import { formatEther, parseEther } from 'viem';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'shared/ui/card';
import { Label } from 'shared/ui/label';
import { Input } from 'shared/ui/input';
import { Slider } from 'shared/ui/slider';
import { Progress } from 'shared/ui/progress';
import { BuyDaoToken } from 'features/buy-dao-token/ui';
import { useTokenBalances } from 'features/token-balance/hooks';
import { useAccount } from 'wagmi';
import { Tabs, TabsList, TabsTrigger } from 'shared/ui/tabs';
import { useBuyPopTokens } from 'features/buy-payment-token/hooks';
import { Button } from 'shared/ui/button';

const BuyDaoTokenPage: FC = () => {
  const [amount, setAmount] = useState<string>('1');
  const [sliderValue, setSliderValue] = useState([25]);
  const [activeTab, setActiveTab] = useState<'dao' | 'pop'>('dao');

  // Общие хуки
  const { address } = useAccount();
  const {
    daoBalance,
    paymentBalance,
    daoSymbol,
    paymentSymbol,
    isLoading: isBalancesLoading,
  } = useTokenBalances(address);

  // Хуки для покупки
  const { isLoading: isDaoLoading, isSuccess: isDaoSuccess, tokenPrice: daoTokenPrice } = useBuyDaoToken();
  const {
    buyPopTokens,
    isLoading: isPopLoading,
    isSuccess: isPopSuccess,
    tokenPrice: popTokenPrice,
  } = useBuyPopTokens();

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    setAmount(value[0].toString());
  };

  // Выбираем актуальную цену в зависимости от таба
  const currentTokenPrice = activeTab === 'dao' ? daoTokenPrice : popTokenPrice;
  const totalPrice = currentTokenPrice ? Number(amount) * Number(formatEther(currentTokenPrice)) : 0;

  const handleBuyPopTokens = async () => {
    if (!currentTokenPrice) return;
    await buyPopTokens(parseEther(amount), currentTokenPrice * parseEther(amount));
  };

  return (
    <div className='flex justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-center text-2xl font-bold'>Покупка токенов</CardTitle>
          <CardDescription className='text-center'>Приобретите токены для участия в экосистеме</CardDescription>
        </CardHeader>

        <CardContent className='space-y-6'>
          {/* Табы для выбора типа токена */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'dao' | 'pop')}>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='dao'>DAO Tokens</TabsTrigger>
              <TabsTrigger value='pop'>POP Tokens</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Блок с балансами */}
          <div className='space-y-2 rounded-lg bg-muted p-4'>
            <h3 className='text-lg font-semibold'>Ваши балансы</h3>
            {isBalancesLoading ? (
              <div className='text-sm text-muted-foreground'>Загрузка балансов...</div>
            ) : (
              <div className='grid gap-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm'>DAO Balance:</span>
                  <span className='font-medium'>
                    {daoBalance ? formatEther(daoBalance) : '0'} {daoSymbol}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm'>POP Balance:</span>
                  <span className='font-medium'>
                    {paymentBalance ? formatEther(paymentBalance) : '0'} {paymentSymbol}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Форма покупки */}
          <div className='space-y-2'>
            <Label htmlFor='amount'>Количество токенов</Label>
            <div className='flex items-center gap-4'>
              <Input
                id='amount'
                type='number'
                min='1'
                value={amount}
                onChange={handleAmountChange}
                className='text-lg font-medium'
              />
              <span className='text-lg font-medium'>{activeTab === 'dao' ? 'DAO' : 'POP'}</span>
            </div>
            <Slider value={sliderValue} onValueChange={handleSliderChange} max={100} step={1} className='mt-4' />
            <div className='flex justify-between text-sm text-muted-foreground'>
              <span>1 {activeTab === 'dao' ? 'DAO' : 'POP'}</span>
              <span>100 {activeTab === 'dao' ? 'DAO' : 'POP'}</span>
            </div>
          </div>

          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Цена за токен</span>
              <span className='font-medium'>{currentTokenPrice ? formatEther(currentTokenPrice) : '...'} ETH</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Общая стоимость</span>
              <span className='font-medium'>{totalPrice.toFixed(6)} ETH</span>
            </div>
          </div>

          {(isDaoLoading || isPopLoading) && (
            <div className='space-y-2'>
              <Progress value={isDaoSuccess || isPopSuccess ? 100 : 50} className='h-2' />
              <p className='text-center text-sm text-muted-foreground'>
                {isDaoSuccess || isPopSuccess ? 'Завершение транзакции...' : 'Подтверждение транзакции...'}
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter>
          {activeTab === 'dao' ? (
            <BuyDaoToken amount={amount} />
          ) : (
            <Button onClick={handleBuyPopTokens} disabled={isPopLoading} className='w-full py-6 text-lg' size='lg'>
              {isPopLoading ? 'Обработка...' : 'Купить POP токены'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default BuyDaoTokenPage;
