'use client';

import { FC } from 'react';

type Props = {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
};

const BurgerMenu: FC<Props> = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  return (
    <button
      className='ml-1 inline-flex h-10 w-10 flex-col items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:hidden'
      onClick={toggleMobileMenu}
      aria-label='Меню'
      aria-expanded={isMobileMenuOpen}
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

export { BurgerMenu };
