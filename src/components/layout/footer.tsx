'use client';

import { useLanguage } from '@/lib/hooks/use-language';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Logo } from '../icons';
import { ArrowUp, GraduationCap, Linkedin, Orbit } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: { [key: string]: React.ElementType } = {
  'orcid': Orbit,
  'graduation-cap': GraduationCap,
  linkedin: Linkedin,
};

export function Footer() {
  const { dictionary } = useLanguage();
  const footerDict = dictionary.footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-card border-t text-sm">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-headline text-lg font-bold text-primary">
              <Logo className="h-6 w-6" />
              <span>Ángel Zamora Martínez</span>
            </Link>
            <p className="text-foreground/70">{footerDict.privacy.text}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-primary/90 tracking-wider uppercase">{footerDict.quickLinks.title}</h3>
            <ul className="space-y-2">
              {dictionary.nav &&
                Object.entries(dictionary.nav).map(([key, label]) => (
                  <li key={key}>
                    <Link href={`/${key === 'home' ? '' : key}`} className="text-foreground/70 hover:text-primary transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-primary/90 tracking-wider uppercase">{footerDict.contact.title}</h3>
            <address className="not-italic space-y-2 text-foreground/70">
              <p>{footerDict.contact.institution}</p>
              <p>{footerDict.contact.location}</p>
              <a href={`mailto:${footerDict.contact.email}`} className="text-primary hover:underline block">
                {footerDict.contact.email}
              </a>
            </address>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-primary/90 tracking-wider uppercase">{footerDict.social.title}</h3>
            <div className="flex items-center gap-2">
              {footerDict.social.profiles.map((profile) => {
                const Icon = iconMap[profile.icon];
                return (
                  <Button key={profile.name} variant="ghost" size="icon" asChild>
                    <a href={profile.url} target="_blank" rel="noopener noreferrer" aria-label={profile.ariaLabel}>
                      {Icon && <Icon className="h-5 w-5" />}
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-foreground/60">
          <p>
            &copy; {new Date().getFullYear()} Ángel Zamora Martínez. {footerDict.copyright.split('. ')[1]}
          </p>
          <Button variant="outline" size="sm" onClick={scrollToTop} className="flex items-center gap-2">
            <ArrowUp className="w-4 h-4" />
            {footerDict.backToTop}
          </Button>
        </div>
      </div>
    </footer>
  );
}
