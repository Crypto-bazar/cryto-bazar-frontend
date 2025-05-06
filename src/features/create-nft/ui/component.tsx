'use client';
import { FC, useEffect, useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from 'shared/ui/form';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from 'shared/ui/button';
import { nftSchema } from 'features/create-nft/model';
import { Input } from 'shared/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from 'shared/ui/dialog';
import { useCreateToken } from '../hooks';

const CreateNFT: FC = () => {
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { createToken, isLoading } = useCreateToken();

  const form = useForm<z.infer<typeof nftSchema>>({
    resolver: zodResolver(nftSchema),
    defaultValues: {
      description: '',
      image: undefined,
      name: '',
    },
  });

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to upload');

      return data.url;
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof nftSchema>) => {
    try {
      if (!values.image) {
        form.setError('image', { message: 'Image is required' });
        return;
      }

      // Загружаем изображение
      const imageUrl = await uploadImage(values.image);

      // Создаем NFT с полученным URL изображения
      await createToken(values.name, values.description, imageUrl);

      setOpen(false);
      form.reset();
    } catch (error) {
      console.error('Error creating NFT:', error);
      form.setError('root', {
        message: error instanceof Error ? error.message : 'Failed to create NFT',
      });
    }
  };

  useEffect(() => {
    if (!open) form.reset();
  }, [open, form]);

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
                      accept='image/*'
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
            <Button type='submit' disabled={isLoading || isUploading}>
              {isLoading || isUploading ? 'Загрузка...' : 'Создать'}
            </Button>
            {form.formState.errors.root && <p className='text-red-500'>{form.formState.errors.root.message}</p>}
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export { CreateNFT };
