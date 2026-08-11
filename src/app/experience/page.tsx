'use client';

import { useLanguage } from '@/lib/hooks/use-language';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Briefcase, Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';

export default function ExperiencePage() {
  const { dictionary, language, isTransitioning } = useLanguage();
  const pageDict = dictionary.experience;

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

      <div className="space-y-12">
        {pageDict.experiences.map((exp, index) => (
          <motion.div key={index} variants={FADE_IN_VARIANTS}>
            <Card className="shadow-lg overflow-hidden">
              <CardHeader className="bg-card/50">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                  <div>
                    <CardTitle className="text-xl text-primary/90 flex items-center gap-3">
                      <Briefcase className="w-6 h-6 text-accent" />
                      {exp.role}
                    </CardTitle>
                    <CardDescription className="!mt-2 font-semibold">{exp.institution}</CardDescription>
                  </div>
                  <Badge variant={exp.status === 'Ongoing' || exp.status === 'En curso' ? 'default' : 'secondary'} className="whitespace-nowrap w-fit">
                    {exp.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/70 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} /> {exp.location}
                  </div>
                  {(exp.startDate || exp.endDate) && (
                    <div className="flex items-center gap-2">
                      <Calendar size={14} /> {exp.startDate} - {exp.endDate}
                    </div>
                  )}
                  {exp.duration && (
                    <div className="flex items-center gap-2">
                      <Clock size={14} /> {exp.duration}
                    </div>
                  )}
                </div>
                <p className="text-foreground/80 mb-6">{exp.description}</p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-primary mb-3">{pageDict.responsibilitiesLabel}</h4>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle size={16} className="text-accent mt-1 flex-shrink-0" />
                          <span className="text-sm text-foreground/80">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-3">{pageDict.skillsLabel}</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
