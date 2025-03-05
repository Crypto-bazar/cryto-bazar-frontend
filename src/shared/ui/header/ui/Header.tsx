'use client';
import { FC, PropsWithChildren, useState } from 'react';
import Image from 'next/image';
import LogoSVG from './svg/shiba-inu-shib-logo.svg';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from 'shared/ui/nav-menu/ui';

const Header: FC<PropsWithChildren> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href={'/test'}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Documentation</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      {children}
    </>
  );
};

export { Header };
