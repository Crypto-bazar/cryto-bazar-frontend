'use client';
import { FC } from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'shared/ui/form/ui';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from 'shared/ui/button/ui';
import { nftSchema } from 'features/create-nft/model';
import { Input } from 'shared/ui/input/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const CreateNFT: FC = () => {
  const form = useForm<z.infer<typeof nftSchema>>({
    resolver: zodResolver(nftSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      image_path: '',
      owner_id: BigInt(1),
      token_id: '',
    },
  });

  const onSubmit = (data: z.infer<typeof nftSchema>) => {
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
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
                <Input placeholder='shadcn' {...field} />
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
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='image_path'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Картинка</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
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
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </FormProvider>
  );
};

export { CreateNFT };
