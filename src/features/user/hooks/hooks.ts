'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { getUser } from 'entities/user/api/api';
import { userActions } from 'entities/user/models/store';
import { useAccount } from 'wagmi';
import { toast } from 'sonner';
import { axiosInstance } from 'shared/api';
import type { Area } from 'react-easy-crop';

const useUser = (address: string) => {
  useEffect(() => {
    (async () => {
      const user = await getUser(address);
      if (!user) return;
      userActions.setUser(user);
    })();
  }, [address]);
};

const useUploadAvatar = () => {
  const { address } = useAccount();
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadBlob = async (blob: Blob) => {
    if (!address) return;
    const formData = new FormData();
    formData.append('avatar', blob, 'avatar.jpg');

    setIsLoading(true);
    try {
      await axiosInstance.post(`/api/v1/users/${address}/avatar`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Аватар обновлён!');
    } catch (err) {
      toast.error('Ошибка загрузки');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !address) {
      toast.error('Выберите файл и подключите кошелёк');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    setIsLoading(true);
    try {
      const response = await axiosInstance.post(`/api/v1/users/${address}/avatar`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Аватар обновлён!');
      console.log('Загружено:', response.data);
    } catch (err) {
      console.error(err);
      toast.error('Ошибка при загрузке аватара');
    } finally {
      setIsLoading(false);
    }
  };

  return { file, isLoading, handleFileChange, handleUpload, handleUploadBlob, setFile };
};

const useCropper = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_croppedArea: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleImage = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageSrc(url);
  };

  return {
    imageSrc,
    crop,
    zoom,
    setCrop,
    setZoom,
    onCropComplete,
    croppedAreaPixels,
    handleImage,
  };
};

export { useUser, useUploadAvatar, useCropper };
