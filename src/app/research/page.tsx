'use client';

import { useLanguage } from '@/lib/hooks/use-language';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BrainCircuit,
  Heart,
  Monitor,
  LifeBuoy,
  ClipboardCheck,
  Building,
  User,
  Calendar,
  MapPin,
  CheckCircle,
  Trophy,
  Award,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const iconMap: { [key: string]: React.ElementType } = {
  brain: BrainCircuit,
  heart: Heart,
  monitor: Monitor,
  suicide: LifeBuoy,
  clipboard: ClipboardCheck,
};

export default function ResearchPage() {
  const { dictionary, language, isTransitioning } = useLanguage();
  const pageDict = dictionary.research;

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
        <p className="mt-2 text-lg text-foreground/80 max-w-2xl mx-auto">{pageDict.subtitle}</p>
      </motion.div>

      {/* Research Lines Section */}
      <motion.section variants={FADE_IN_VARIANTS} className="mb-20">
        <h2 className="text-3xl font-headline text-primary/90 mb-8 text-center">{pageDict.research_lines.title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pageDict.research_lines.lines.map((line, index) => {
            const Icon = iconMap[line.icon];
            return (
              <motion.div key={index} custom={index} variants={FADE_IN_VARIANTS}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {Icon && <Icon className="w-8 h-8 text-accent" />}
                    <CardTitle className="text-xl">{line.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">{line.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Research Projects / Contracts Section */}
      <motion.section variants={FADE_IN_VARIANTS} className="mb-20">
        <h2 className="text-3xl font-headline text-primary/90 mb-2 text-center">{pageDict.research_projects.title}</h2>
        <p className="text-center text-lg text-foreground/80 mb-8">{pageDict.research_projects.subtitle}</p>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pageDict.research_projects.projects.map((project, index) => (
            <motion.div key={index} custom={index} variants={FADE_IN_VARIANTS}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{project.name}</CardTitle>
                  <CardDescription>{project.fullTitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                    <span>
                      <strong>PI:</strong> {project.pi}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                    <span>
                      {project.institution} &middot; {project.entity}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                    <span>{project.period}</span>
                  </div>
                  <Badge variant="secondary" className="mt-2">
                    {project.role}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Research Stays Section */}
      <motion.section variants={FADE_IN_VARIANTS} className="mb-20">
        <h2 className="text-3xl font-headline text-primary/90 mb-2 text-center">{pageDict.research_stays.title}</h2>
        <p className="text-center text-lg text-foreground/80 mb-8">{pageDict.research_stays.subtitle}</p>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {pageDict.research_stays.stays.map((stay, index) => (
            <motion.div key={index} custom={index} variants={FADE_IN_VARIANTS}>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{stay.institution}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin size={14} /> {stay.city}, {stay.country}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <p className="text-sm text-foreground/80">{stay.objectives}</p>
                </CardContent>
                <div className="p-6 pt-0 flex flex-wrap gap-2 text-xs">
                  <Badge variant="default">{stay.duration}</Badge>
                  {stay.dates && (
                    <Badge variant="outline" className="whitespace-nowrap">
                      {stay.dates}
                    </Badge>
                  )}
                  <Badge variant="secondary" className="whitespace-nowrap">
                    {stay.grantType}
                  </Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <Separator className="my-16" />

      {/* Grants and Awards */}
      <motion.section variants={FADE_IN_VARIANTS}>
        <h2 className="text-3xl font-headline text-primary/90 mb-2 text-center">{pageDict.grants_awards.title}</h2>
        <p className="text-center text-lg text-foreground/80 mb-12">{pageDict.grants_awards.subtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center mb-12 max-w-xl mx-auto">
          <Card className="p-4 flex flex-col justify-center items-center">
            <Trophy className="h-8 w-8 text-accent mb-2" />
            <span className="text-2xl font-bold">{pageDict.grants_awards.summary.totalGrants}</span>
            <span className="text-sm text-foreground/70">{pageDict.grants_awards.summary.grantsLabel}</span>
          </Card>
          <Card className="p-4 flex flex-col justify-center items-center">
            <Award className="h-8 w-8 text-accent mb-2" />
            <span className="text-2xl font-bold">{pageDict.grants_awards.summary.competitiveGrants}</span>
            <span className="text-sm text-foreground/70">{pageDict.grants_awards.summary.competitiveLabel}</span>
          </Card>
        </div>
        <div className="space-y-6">
          {pageDict.grants_awards.grants.map((grant, index) => (
            <motion.div key={index} custom={index} variants={FADE_IN_VARIANTS}>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-lg text-primary">{grant.name}</CardTitle>
                    <Badge variant="outline">{grant.status}</Badge>
                  </div>
                  <CardDescription>{grant.entity}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80 mb-4">{grant.description}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs items-center">
                    <Badge variant="secondary">{grant.type}</Badge>
                    <span className="font-mono text-muted-foreground">{grant.code}</span>
                    <span>{grant.period}</span>
                    {grant.amount && <span className="font-semibold text-accent">{grant.amount}</span>}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <p className="flex items-center justify-center gap-2 mt-10 text-sm text-foreground/70">
          <CheckCircle className="w-4 h-4 text-accent" />
          {pageDict.grants_awards.footnote}
        </p>
      </motion.section>
    </motion.div>
  );
}
