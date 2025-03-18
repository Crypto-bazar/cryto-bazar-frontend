import { z } from 'zod';

export const nftSchema = z.object({
  name: z.string().max(255, 'Название не может быть длиннее 255 символов'),
  description: z.string(),
  image: z.instanceof(File, { message: 'Файл должен быть изображением' }),
});
