import { FC } from 'react';

type Props = {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
};

const Burger: FC<Props> = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  return (
    <button
      className='ml-4 flex flex-col items-center justify-center md:hidden'
      onClick={toggleMobileMenu}
      aria-label='Меню'
    >
      <span
        className={`block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-y-1 rotate-45' : '-translate-y-0.5'
        }`}
      ></span>
      <span
        className={`my-0.5 block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ease-out ${
          isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
        }`}
      ></span>
      <span
        className={`block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ease-out ${
          isMobileMenuOpen ? '-translate-y-1 -rotate-45' : 'translate-y-0.5'
        }`}
      ></span>
    </button>
  );
};

export { Burger };
