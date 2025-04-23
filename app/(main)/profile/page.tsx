// app/profile/page.tsx
import { redirect } from 'next/navigation';

export default function ProfileIndex() {
  redirect('/profile/nfts');
}
