import { Separator } from 'shared/ui/separator';
import { Badge } from 'shared/ui/badge';

const NFTInfo = ({ name, ownerId, description }: { name: string; ownerId: number; description?: string }) => (
  <div className='space-y-4'>
    <h1 className='text-4xl font-bold tracking-tight'>{name}</h1>
    <div className='flex items-center gap-2'>
      <span className='text-sm text-muted-foreground'>Владелец:</span>
      <Badge variant='secondary'>#{ownerId}</Badge>
    </div>
    <Separator />
    <div>
      <h3 className='text-lg font-semibold'>Описание</h3>
      <p className='text-muted-foreground'>{description || 'Описание отсутствует'}</p>
    </div>
  </div>
);

export { NFTInfo };
