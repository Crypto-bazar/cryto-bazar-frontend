'use client';
import { FC, useState } from 'react';
import { useBuyDaoToken } from 'features/buy-dao-token/hooks';
import { formatEther } from 'viem';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'shared/ui/card';
import { Label } from 'shared/ui/label';
import { Input } from 'shared/ui/input';
import { Slider } from 'shared/ui/slider';
import { Progress } from 'shared/ui/progress';
import { BuyDaoToken } from 'features/buy-dao-token/ui';

const BuyDaoTokenPage: FC = () => {
  const [amount, setAmount] = useState<string>('1');
  const [sliderValue, setSliderValue] = useState([25]);
  const { isLoading, isSuccess, tokenPrice } = useBuyDaoToken();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    setAmount(value[0].toString());
  };

  const totalPrice = tokenPrice ? Number(amount) * Number(formatEther(tokenPrice)) : 0;

  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-center text-2xl font-bold'>Покупка DAO токенов</CardTitle>
          <CardDescription className='text-center'>
            Приобретите токены управления для участия в голосованиях
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-6'>
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
              <span className='text-lg font-medium'>TKN</span>
            </div>
            <Slider value={sliderValue} onValueChange={handleSliderChange} max={100} step={1} className='mt-4' />
            <div className='flex justify-between text-sm text-muted-foreground'>
              <span>1 TKN</span>
              <span>100 TKN</span>
            </div>
          </div>

          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Цена за токен</span>
              <span className='font-medium'>{tokenPrice ? formatEther(tokenPrice) : '...'} ETH</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Общая стоимость</span>
              <span className='font-medium'>{totalPrice.toFixed(6)} ETH</span>
            </div>
          </div>

          {isLoading && (
            <div className='space-y-2'>
              <Progress value={isSuccess ? 100 : 50} className='h-2' />
              <p className='text-center text-sm text-muted-foreground'>
                {isSuccess ? 'Завершение транзакции...' : 'Подтверждение транзакции...'}
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <BuyDaoToken amount={amount} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default BuyDaoTokenPage;
