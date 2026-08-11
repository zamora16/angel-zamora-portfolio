'use client';

import { useState, useMemo } from 'react';
import { useLanguage } from '@/lib/hooks/use-language';
import { publications } from '@/lib/data';
import type { Publication } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BookOpen, FileText, BarChart, Award, Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export default function PublicationsPage() {
  const { dictionary, language, isTransitioning } = useLanguage();
  const pageDict = dictionary.publications;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');

  const years = useMemo(() => [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a), []);

  const mergedPublications = useMemo(() => {
    return publications.map((pub) => {
      const langVersion = pageDict.list.find((p) => p.id === pub.id);
      return { ...pub, ...langVersion };
    });
  }, [pageDict.list]);

  const filteredPublications = useMemo(() => {
    return mergedPublications
      .filter((p) => {
        const titleMatch = p.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const journalMatch = p.journal?.toLowerCase().includes(searchTerm.toLowerCase());
        const searchMatch = searchTerm === '' || titleMatch || journalMatch;
        const yearMatch = selectedYear === 'all' || p.year === selectedYear;
        return searchMatch && yearMatch;
      })
      .sort((a, b) => b.year - a.year);
  }, [searchTerm, selectedYear, mergedPublications]);

  const FADE_IN_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const q1Count = publications.filter((p) => p.quartile === 'Q1').length;
  const firstAuthorCount = publications.filter((p) => p.firstAuthor).length;

  const METRICS = [
    { label: pageDict.metrics.total, value: String(publications.length), icon: BookOpen },
    { label: pageDict.metrics.q1, value: String(q1Count), icon: TrendingUp },
    { label: pageDict.metrics.firstAuthor, value: String(firstAuthorCount), icon: Award },
    { label: pageDict.metrics.avgImpact, value: pageDict.metrics.avgImpactValue, icon: FileText },
  ];

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
      <motion.h1 variants={FADE_IN_VARIANTS} className="text-4xl md:text-5xl font-headline text-primary mb-8 text-center">
        {pageDict.title}
      </motion.h1>

      <motion.section variants={FADE_IN_VARIANTS} className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {METRICS.map((metric, index) => (
            <Card key={index} className="p-4 flex flex-col justify-center">
              <metric.icon className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold">{metric.value}</p>
              <p className="text-sm text-foreground/70">{metric.label}</p>
            </Card>
          ))}
        </div>
      </motion.section>

      <motion.div variants={FADE_IN_VARIANTS} className="bg-card p-6 rounded-lg border mb-12 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder={pageDict.filters.search + '...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={String(selectedYear)} onValueChange={(value) => setSelectedYear(value === 'all' ? 'all' : Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder={pageDict.filters.year} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {pageDict.filters.all} {pageDict.filters.year.toLowerCase()}s
              </SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <div className="space-y-8">
        {filteredPublications.length > 0 ? (
          filteredPublications.map((pub: Publication, index) => (
            <motion.div
              key={pub.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={FADE_IN_VARIANTS}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-lg md:text-xl font-bold text-primary/90">{pub.title}</CardTitle>
                    {pub.firstAuthor && (
                      <Badge variant="default" className="flex-shrink-0 whitespace-nowrap">
                        {pageDict.filters.firstAuthorBadge}
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-sm pt-2 text-foreground/70">{pub.authors}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="italic text-foreground/80">{pub.journal}</p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm">
                    <Badge variant="outline">{pub.yearLabel ?? pub.year}</Badge>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-center">
                    {pub.quartile && pub.position && (
                      <div className="flex flex-col items-center justify-center p-2 bg-muted/50 rounded-md">
                        <BarChart className="h-5 w-5 mb-1 text-accent" />
                        <span className="font-semibold">{pub.quartile}</span>
                        <span className="text-foreground/70">{pub.position}</span>
                      </div>
                    )}
                    {pub.impactFactor && (
                      <div className="flex flex-col items-center justify-center p-2 bg-muted/50 rounded-md">
                        <FileText className="h-5 w-5 mb-1 text-accent" />
                        <span className="font-semibold">{pub.impactFactor}</span>
                        <span className="text-foreground/70">{pageDict.filters.impactLabel}</span>
                      </div>
                    )}
                    <div className="flex flex-col items-center justify-center p-2 bg-muted/50 rounded-md">
                      <Award className="h-5 w-5 mb-1 text-accent" />
                      <span className="font-semibold">
                        {pub.firstAuthor ? pageDict.filters.firstAuthorBadge : `${pageDict.filters.positionLabel} ${pub.authorPosition}`}
                      </span>
                      <span className="text-foreground/70">
                        {pageDict.filters.ofLabel} {pub.totalAuthors}
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 bg-muted/50 rounded-md">
                      <Users className="h-5 w-5 mb-1 text-accent" />
                      <span className="font-semibold">{pub.totalAuthors}</span>
                      <span className="text-foreground/70">{pageDict.filters.authorsLabel}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <motion.div variants={FADE_IN_VARIANTS} className="text-center py-16 text-foreground/70">
            <p>{pageDict.filters.noResults}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
