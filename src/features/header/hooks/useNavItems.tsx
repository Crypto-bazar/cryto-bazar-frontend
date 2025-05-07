import { useAccount } from 'wagmi';

const useNavItems = () => {
  const { address } = useAccount();

  return [
    { href: '/nfts', label: 'NFT коллекции' },
    { href: '/market', label: 'Торговая площадка' },
    ...(address ? [{ href: '/profile', label: 'Личный кабинет' }] : []),
  ];
};

export { useNavItems };
