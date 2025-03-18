'use client';
import { FC, useEffect, useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from 'shared/ui/form/ui';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from 'shared/ui/button/ui';
import { nftSchema } from 'features/create-nft/model';
import { Input } from 'shared/ui/input/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createNFTApi } from '../api/api';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/ui/dialog/ui';
import { useAccount } from 'wagmi';
import { nftActions } from '@/entities/nft/models';
import { useEventListener } from '../hooks';

const CreateNFT: FC = () => {
  const [open, setOpen] = useState(false);
  const { address } = useAccount();

  const { data } = useEventListener()

  useEffect(() => {
    if (data) {
      if (!data.tokenURI) {
        return;
      }
      nftActions.changeTokenId(data.tokenURI, Number(data.tokenId))
    }
  }, [data])

  const form = useForm<z.infer<typeof nftSchema>>({
    resolver: zodResolver(nftSchema),
    defaultValues: {
      description: '',
      image: undefined,
      name: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof nftSchema>) => {
    const formData = { ...data, owner_address: address as string };
    const response = await createNFTApi(formData);

    if (response?.status == 201) {
      nftActions.addNFT(response.data)
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='default'>Новая NFT</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создание NFT</DialogTitle>
        </DialogHeader>
        <DialogDescription>Заполните форму, чтобы создать новую NFT.</DialogDescription>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='name'
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
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Input placeholder='Введите описание' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Картинка</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Создать</Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export { CreateNFT };
