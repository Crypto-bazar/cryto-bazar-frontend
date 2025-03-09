'use client';
import { FC } from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'shared/ui/form/ui';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from 'shared/ui/button/ui';
import { nftSchema } from 'features/create-nft/model';
import { Input } from 'shared/ui/input/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createNFTApi } from '../api/api';

const CreateNFT: FC = () => {
  const form = useForm<z.infer<typeof nftSchema>>({
    resolver: zodResolver(nftSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      token_id: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof nftSchema>) => {
    const formData = { ...data, owner_address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' };
    await createNFTApi(formData);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 rounded-[8px] bg-[#3b5a6b] px-5 py-5 text-white'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder='Выберите название' {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
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
                <Input placeholder='Выберите описание' {...field} className='placeholder-slate-200' />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Цена</FormLabel>
              <FormControl>
                <Input placeholder='Выберите цену' {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
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
                  id='image'
                  type='file'
                  placeholder='Выберите картинку'
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='token_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Токен</FormLabel>
              <FormControl>
                <Input placeholder='Введите адрес токена' {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Создать NFT</Button>
      </form>
    </FormProvider>
  );
};

export { CreateNFT };
