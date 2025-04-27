import { useAccount } from 'wagmi';

const useNavItems = () => {
  const { address } = useAccount();

  const navItems = [
    { href: '/nfts', label: 'NFT коллекции' },
    { href: '/market', label: 'Торговая площадка' },
    ...(address ? [{ href: '/profile', label: 'Личный кабинет' }] : []),
  ];

  return navItems;
};

export { useNavItems };
