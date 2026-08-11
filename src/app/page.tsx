'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/hooks/use-language';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const { dictionary, language, isTransitioning } = useLanguage();
  const homeDict = dictionary.home;

  const FADE_IN_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      key={language}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
      }}
      className={cn('transition-opacity duration-300', isTransitioning ? 'opacity-0' : 'opacity-100')}
    >
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-headline font-bold text-primary"
            variants={FADE_IN_VARIANTS}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {homeDict.name}
          </motion.h1>
          <motion.p
            className="mt-2 text-2xl md:text-3xl font-headline text-primary/80"
            variants={FADE_IN_VARIANTS}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {homeDict.title}
          </motion.p>
          <motion.p
            className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto"
            variants={FADE_IN_VARIANTS}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {homeDict.tagline}
          </motion.p>
          <motion.div
            variants={FADE_IN_VARIANTS}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 flex justify-center gap-4"
          >
            <Button asChild size="lg">
              <Link href="/publications">{homeDict.buttons.publications}</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/projects">{homeDict.buttons.projects}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/angel-zamora.png"
                alt="Ángel Zamora Martínez"
                width={400}
                height={400}
                className="rounded-lg aspect-square object-cover mx-auto shadow-2xl border-4 border-card"
              />
            </motion.div>
            <motion.div
              className="lg:col-span-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.h2 className="text-3xl md:text-4xl font-headline text-primary mb-6" variants={FADE_IN_VARIANTS}>
                {homeDict.about.title}
              </motion.h2>
              {homeDict.about.paragraphs.map((p, i) => (
                <motion.p key={i} className="text-foreground/80 leading-relaxed mb-4" variants={FADE_IN_VARIANTS}>
                  {p}
                </motion.p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise & Education Section */}
      <section className="py-20 md:py-28 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ staggerChildren: 0.1 }}>
              <motion.h3 variants={FADE_IN_VARIANTS} className="text-2xl md:text-3xl font-headline text-primary mb-6">
                {homeDict.about.expertise.title}
              </motion.h3>
              <motion.ul variants={FADE_IN_VARIANTS} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {homeDict.about.expertise.areas.map((area, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-foreground/80">{area}</span>
                  </li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1, delay: 0.2 }}
            >
              <motion.h3 variants={FADE_IN_VARIANTS} className="text-2xl md:text-3xl font-headline text-primary mb-6">
                {homeDict.about.education.title}
              </motion.h3>
              <motion.div variants={FADE_IN_VARIANTS} className="space-y-6">
                {homeDict.about.education.degrees.map((degree, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-md mt-1">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary/90">{degree.title}</h4>
                      <p className="text-foreground/80">
                        {degree.university}
                        {degree.year ? `, ${degree.year}` : ''}
                      </p>
                      {degree.grade && <p className="text-sm text-foreground/60">{degree.grade}</p>}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
