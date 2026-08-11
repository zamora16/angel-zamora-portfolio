'use client';

import { useLanguage } from '@/lib/hooks/use-language';
import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, GraduationCap, Orbit, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const iconMap: { [key: string]: React.ElementType } = {
  orcid: Orbit,
  'graduation-cap': GraduationCap,
  linkedin: Linkedin,
};

export default function ContactPage() {
  const { dictionary, language, isTransitioning } = useLanguage();
  const pageDict = dictionary.contact;

  const FADE_IN_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      key={language}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
      }}
      className={cn('container mx-auto px-4 py-12 md:py-16', isTransitioning ? 'opacity-0' : 'opacity-100')}
    >
      <motion.div variants={FADE_IN_VARIANTS} className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-primary">{pageDict.title}</h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">{pageDict.subtitle}</p>
      </motion.div>

      <div className="grid md:grid-cols-5 gap-12">
        <motion.div variants={FADE_IN_VARIANTS} className="md:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{pageDict.form.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </motion.div>

        <div className="md:col-span-2 space-y-8">
          <motion.div variants={FADE_IN_VARIANTS} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{pageDict.socialProfiles.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href={`mailto:${pageDict.contactInfo.email}`} className="flex items-center gap-4 group">
                  <div className="p-2 rounded-md bg-primary">
                    <Mail className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground/90 group-hover:text-primary transition-colors">
                      {pageDict.contactInfo.emailLabel}
                    </h3>
                    <p className="text-sm text-foreground/70 group-hover:underline">{pageDict.contactInfo.email}</p>
                  </div>
                </Link>
                {pageDict.socialProfiles.profiles.map((profile) => {
                  const Icon = iconMap[profile.icon];
                  return (
                    <Link
                      key={profile.name}
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group"
                    >
                      <div className="p-2 rounded-md" style={{ backgroundColor: profile.color }}>
                        {Icon && <Icon className="h-5 w-5 text-white" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground/90 group-hover:text-primary transition-colors">
                          {profile.name}
                        </h3>
                        <p className="text-sm text-foreground/70 group-hover:underline">{profile.username}</p>
                      </div>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={FADE_IN_VARIANTS} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{pageDict.availability.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {pageDict.availability.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
