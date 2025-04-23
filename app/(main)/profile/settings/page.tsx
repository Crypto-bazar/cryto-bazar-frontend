import { UploadAvatarForm } from 'features/user/ui/component';

export default function SettingsPage() {
  return (
    <div className='mx-auto mt-10 max-w-md rounded-xl border bg-white p-6 shadow-sm'>
      <h1 className='mb-4 text-2xl font-semibold'>Настройки профиля</h1>
      <UploadAvatarForm />
    </div>
  );
}
