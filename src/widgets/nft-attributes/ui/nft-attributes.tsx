import { Card, CardContent, CardHeader, CardTitle } from 'shared/ui/card';

const NFTAttributes = ({ attributes }: { attributes: { label: string; value: string | number }[] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Атрибуты</CardTitle>
    </CardHeader>
    <CardContent className='grid grid-cols-2 gap-4'>
      {attributes.map((attr) => (
        <div key={attr.label}>
          <p className='text-sm text-muted-foreground'>{attr.label}</p>
          <p className='font-medium'>{attr.value}</p>
        </div>
      ))}
    </CardContent>
  </Card>
);

export { NFTAttributes };
