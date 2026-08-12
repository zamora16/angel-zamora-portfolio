'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/hooks/use-language';
import { LanguageSwitcher } from './language-switcher';
import { MobileNav } from './mobile-nav';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function Header() {
  const { dictionary } = useLanguage();
  const navItems = dictionary.nav;
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const links = [
    { href: '/', label: navItems.home },
    { href: '/research', label: navItems.research },
    { href: '/publications', label: navItems.publications },
    { href: '/conferences', label: navItems.conferences },
    { href: '/teaching', label: navItems.teaching },
    { href: '/skills', label: navItems.skills },
    { href: '/projects', label: navItems.projects },
    { href: '/experience', label: navItems.experience },
    { href: '/contact', label: navItems.contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-sm border-b' : 'bg-background/0'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-headline text-lg font-bold text-primary">
            <span>Ángel Zamora</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-foreground/70 transition-colors hover:text-primary',
                  pathname === link.href && 'text-primary font-semibold'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
          </div>

          <div className="lg:hidden">
            <MobileNav navLinks={links} />
          </div>
        </div>
      </div>
    </header>
  );
}
