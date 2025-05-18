import { Button } from 'shared/ui/button';
import { FC, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from 'shared/ui/dialog';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { sellNFTSchema } from '../model/sell-nft.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSellNFT } from '../hooks';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from 'shared/ui/form';
import { Input } from 'shared/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'shared/ui/select';

type Props = {
  tokenId: number;
};

const ETH_UNITS = [
  { value: 'eth', label: 'POP' },
  { value: 'gwei', label: 'gPOP' },
  { value: 'wei', label: 'wPOP' },
] as const;

type EthUnit = (typeof ETH_UNITS)[number]['value'];

const SellNFT: FC<Props> = ({ tokenId }) => {
  const [open, setOpen] = useState(false);
  const [unit, setUnit] = useState<EthUnit>('eth');
  const { sellNFT } = useSellNFT();

  const form = useForm<z.infer<typeof sellNFTSchema>>({
    resolver: zodResolver(sellNFTSchema),
    defaultValues: {
      price: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof sellNFTSchema>) => {
    let priceInWei: number;
    const price = Number(data.price);

    switch (unit) {
      case 'eth':
        priceInWei = price * 1e18;
        break;
      case 'gwei':
        priceInWei = price * 1e9;
        break;
      case 'wei':
        priceInWei = price;
        break;
      default:
        priceInWei = price * 1e18;
    }

    sellNFT(tokenId, priceInWei);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Продать</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Выставить на продажу</DialogTitle>
        </DialogHeader>
        <DialogDescription>Заполните форму, чтобы выставить на продажу NFT.</DialogDescription>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='flex items-end gap-2'>
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Цена</FormLabel>
                    <FormControl>
                      <Input placeholder='Введите цену' type='number' step='any' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem className='w-[120px]'>
                <FormLabel>Единица</FormLabel>
                <Select value={unit} onValueChange={(value: EthUnit) => setUnit(value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Выберите единицу' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ETH_UNITS.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            </div>
            <Button type='submit'>Выставить на продажу</Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export { SellNFT };
