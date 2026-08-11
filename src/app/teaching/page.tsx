'use client';

import { useLanguage } from '@/lib/hooks/use-language';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Clock, Calendar, Award, GraduationCap, Lightbulb, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

export default function TeachingPage() {
  const { dictionary, language, isTransitioning } = useLanguage();
  const pageDict = dictionary.teaching;

  const FADE_IN_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const summaryCards = [
    { label: `${pageDict.summary.totalHours}h`, description: pageDict.summary.totalHoursLabel, icon: Clock },
    { label: `${pageDict.summary.totalCredits} ECTS`, description: pageDict.summary.totalCreditsLabel, icon: BookOpen },
    { label: pageDict.summary.yearsExperience, description: pageDict.summary.yearsExperienceLabel, icon: Calendar },
    { label: pageDict.summary.institution, description: pageDict.summary.institutionLabel, icon: GraduationCap },
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
      <motion.div variants={FADE_IN_VARIANTS} className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-primary">{pageDict.title}</h1>
        <p className="mt-2 text-lg text-foreground/80">{pageDict.subtitle}</p>
      </motion.div>

      {/* Summary Section */}
      <motion.div variants={FADE_IN_VARIANTS} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {summaryCards.map((item, index) => (
          <Card key={index} className="text-center p-4 bg-card hover:shadow-md transition-shadow">
            <item.icon className="w-10 h-10 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary/90">{item.label}</p>
            <p className="text-sm text-foreground/70 mt-1">{item.description}</p>
          </Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Courses Taught */}
          <motion.section variants={FADE_IN_VARIANTS}>
            <h2 className="text-3xl font-headline text-primary/90 mb-6">{pageDict.courses.title}</h2>
            <Accordion type="single" collapsible className="w-full">
              {pageDict.courses.courses.map((course, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    <div className="flex flex-col text-left">
                      <span>{course.name}</span>
                      <span className="text-sm font-normal text-foreground/60">{course.degree}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 text-foreground/80 pt-2">
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      <Badge variant="outline">{course.academicYear}</Badge>
                      <Badge variant="outline">{course.credits} ECTS</Badge>
                      <Badge variant="outline">{course.language}</Badge>
                      <Badge variant="secondary">{course.type}</Badge>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.section>
        </div>

        <aside className="space-y-8">
          {/* Student Evaluations */}
          <motion.div variants={FADE_IN_VARIANTS}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-accent" />
                  <span>{pageDict.ratings.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pageDict.ratings.byYear.map((evalItem) => (
                  <div key={evalItem.academicYear}>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-sm font-medium text-foreground/80">{evalItem.academicYear}</span>
                      <span className="text-sm font-bold text-primary">
                        {evalItem.rating} / {evalItem.outOf}
                      </span>
                    </div>
                    <Progress value={(evalItem.rating / evalItem.outOf) * 100} className="h-2" />
                  </div>
                ))}
                <p className="text-xs text-center text-foreground/60 pt-2 italic">{pageDict.ratings.description}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Teaching Training */}
          <motion.div variants={FADE_IN_VARIANTS}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-accent" />
                  <span>{pageDict.training.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  {pageDict.training.training.map((item, index) => (
                    <li key={index} className="border-b border-border/50 pb-2 last:border-b-0">
                      <p className="font-medium">{item.course}</p>
                      <p className="text-foreground/70">{item.institution}</p>
                      <div className="flex justify-end items-center text-xs mt-1 text-foreground/60">
                        <span>{item.hours}h</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </aside>
      </div>
    </motion.div>
  );
}
