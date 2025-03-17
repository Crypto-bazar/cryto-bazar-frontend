import { Button } from '@/shared/ui/button/ui';
import { FC, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/ui/dialog/ui';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { sellNFTSchema } from '../model/sell-nft.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSellNFT } from '../hooks';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form/ui';
import { Input } from '@/shared/ui/input/ui';

type Props = {
  tokenId: number;
};

const SellNFT: FC<Props> = ({ tokenId }) => {
  const [open, setOpen] = useState(false);
  const { sellNFT } = useSellNFT();
  const form = useForm<z.infer<typeof sellNFTSchema>>({
    resolver: zodResolver(sellNFTSchema),
    defaultValues: {
      price: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof sellNFTSchema>) => {
    sellNFT(tokenId, Number(data.price));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='default'>Продать</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Выставить на продажу</DialogTitle>
        </DialogHeader>
        <DialogDescription>Заполните форму, чтобы выставить на продажу NFT.</DialogDescription>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input placeholder='Введите название' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Выставить на продажу</Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export { SellNFT };
