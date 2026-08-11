import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/context/language-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Ángel Zamora Martínez',
  description:
    'Personal website of Ángel Zamora Martínez, PhD in Psychology and data analyst & researcher, showcasing quantitative research on health and behavior, JCR publications, and applied data engineering projects.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body bg-background text-foreground min-h-screen flex flex-col')}>
        <LanguageProvider>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
