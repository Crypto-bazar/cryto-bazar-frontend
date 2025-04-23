'use client';

import { useCropper, useUploadAvatar } from 'features/user/hooks';
import { Label } from 'shared/ui/label';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { getCroppedImg } from 'features/user/lib';
import Cropper from 'react-easy-crop';
import { Slider } from 'shared/ui/slider';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { getUser } from 'entities/user/api/api';
import Image from 'next/image';

export const UploadAvatarForm = () => {
  const { file, setFile, isLoading, handleUploadBlob, resetUpload } = useUploadAvatar();
  const cropper = useCropper();

  const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);
  const { address } = useAccount();

  useEffect(() => {
    if (!address) return;
    (async () => {
      const user = await getUser(address);
      if (!user) return;
      setCurrentAvatar(`${process.env.NEXT_PUBLIC_API_URL}${user.avatar_url}`);
    })();
  }, [address]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    cropper.handleImage(selected);
  };

  const onCropAndUpload = async () => {
    if (!cropper.imageSrc || !cropper.croppedAreaPixels) return;

    const blob = await getCroppedImg(cropper.imageSrc, cropper.croppedAreaPixels);
    const success = await handleUploadBlob(blob);

    if (success) {
      resetUpload();
      setCurrentAvatar(`${process.env.NEXT_PUBLIC_API_URL}${success}`);
    }
  };

  return (
    <div className='space-y-4'>
      {currentAvatar && (
        <div>
          <Label>Текущий аватар</Label>
          <Image src={currentAvatar} alt='Current avatar' width={100} height={100} className='rounded-full' />
        </div>
      )}

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
