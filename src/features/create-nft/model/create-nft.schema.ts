import { z } from 'zod';

export const nftSchema = z.object({
  name: z.string().max(255, 'Название не может быть длиннее 255 символов'),
  symbol: z.string().max(5, 'Символ токена не может быть длиннее 5 симолов'),
  description: z.string(),
  price: z.string().regex(/^\d+(\.\d{1,18})?$/, 'Цена должна быть числом с не более 18 знаками после запятой'),
  image: z.instanceof(File, { message: 'Файл должен быть изображением' }),
});
