'use client';

import { useCropper, useUploadAvatar } from 'features/user/hooks';
import { Label } from 'shared/ui/label';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { getCroppedImg } from 'features/user/lib';
import Cropper from 'react-easy-crop';
import { Slider } from 'shared/ui/slider';

export const UploadAvatarForm = () => {
  const { file, setFile, isLoading, handleUploadBlob } = useUploadAvatar();
  const cropper = useCropper();

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    cropper.handleImage(selected);
  };

  const onCropAndUpload = async () => {
    if (!cropper.imageSrc || !cropper.croppedAreaPixels) return;

    const blob = await getCroppedImg(cropper.imageSrc, cropper.croppedAreaPixels);
    handleUploadBlob(blob);
  };

  return (
    <div className='space-y-4'>
      <div>
        <Label htmlFor='avatar'>Загрузить аватар</Label>
        <Input id='avatar' type='file' accept='image/*' onChange={onSelectFile} />
      </div>

      {cropper.imageSrc && (
        <div className='relative h-[300px] w-full bg-black'>
          <Cropper
            image={cropper.imageSrc}
            crop={cropper.crop}
            zoom={cropper.zoom}
            aspect={1}
            onCropChange={cropper.setCrop}
            onZoomChange={cropper.setZoom}
            onCropComplete={cropper.onCropComplete}
          />
          <Slider
            defaultValue={[cropper.zoom]}
            min={1}
            max={3}
            step={0.1}
            onValueChange={(val) => cropper.setZoom(val[0])}
            className='absolute bottom-4 left-4 w-[calc(100%-2rem)]'
          />
        </div>
      )}

      <Button onClick={onCropAndUpload} disabled={isLoading || !file}>
        {isLoading ? 'Загрузка...' : 'Обрезать и загрузить'}
      </Button>
    </div>
  );
};
