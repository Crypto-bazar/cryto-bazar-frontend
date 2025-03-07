import { z } from 'zod';

export const nftSchema = z.object({
  token_id: z
    .string()
    .length(42, 'Token ID должен содержать 42 символа')
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Некорректный формат Token ID'),
  name: z.string().max(255, 'Название не может быть длиннее 255 символов').optional(),
  description: z.string().optional(),
  price: z.string().regex(/^\d+(\.\d{1,18})?$/, 'Цена должна быть числом с не более 18 знаками после запятой'),
  owner_id: z.bigint().positive(),
  image_path: z.string().optional(),
});
