'use client';

import { useLanguage } from '@/lib/hooks/use-language';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center rounded-md border p-1 bg-muted">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage('en')}
        className={cn(
          'px-3 py-1 text-sm h-auto',
          language === 'en' ? 'bg-accent text-accent-foreground shadow-sm' : 'hover:bg-accent/50'
        )}
      >
        EN
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage('es')}
        className={cn(
          'px-3 py-1 text-sm h-auto',
          language === 'es' ? 'bg-accent text-accent-foreground shadow-sm' : 'hover:bg-accent/50'
        )}
      >
        ES
      </Button>
    </div>
  );
}
