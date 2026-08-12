'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { LanguageSwitcher } from './language-switcher';

interface MobileNavProps {
  navLinks: { href: string; label: string }[];
}

export function MobileNav({ navLinks }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetHeader className="border-b pb-4">
          <SheetTitle>
            <Link
              href="/"
              className="flex items-center gap-2 font-headline text-lg font-bold text-primary"
              onClick={() => setIsOpen(false)}
            >
              <Image src="/logo.png" alt="Ángel Zamora" width={28} height={28} className="h-7 w-7 object-contain" />
              <span>Ángel Zamora</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
          <nav className="flex flex-col gap-4 mt-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors px-6"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto p-6 border-t">
            <LanguageSwitcher />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
