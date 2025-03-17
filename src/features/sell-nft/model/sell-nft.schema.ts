import { z } from 'zod';

export const sellNFTSchema = z.object({
  price: z.string().regex(/^\d+(\.\d{1,18})?$/, 'Цена должна быть числом с не более 18 знаками после запятой'),
});
