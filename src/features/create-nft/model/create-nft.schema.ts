import { z } from 'zod';

export const nftSchema = z.object({
  token_id: z
    .string()
    .length(42, 'Token ID должен содержать 42 символа')
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Некорректный формат Token ID'),
  name: z.string().max(255, 'Название не может быть длиннее 255 символов'),
  symbol: z.string().max(5, "Символ токена не может быть длиннее 5 симолов"),
  description: z.string(),
  price: z.string().regex(/^\d+(\.\d{1,18})?$/, 'Цена должна быть числом с не более 18 знаками после запятой'),
  image: z.instanceof(File, { message: 'Файл должен быть изображением' }),
});
