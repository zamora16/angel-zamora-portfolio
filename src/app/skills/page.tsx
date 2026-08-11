'use client';

import { useLanguage } from '@/lib/hooks/use-language';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { BarChart2, Code2, FlaskConical, Languages, GraduationCap } from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  'bar-chart': BarChart2,
  code: Code2,
  flask: FlaskConical,
};

export default function SkillsPage() {
  const { dictionary, language, isTransitioning } = useLanguage();
  const pageDict = dictionary.skills;

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

      {/* Technical Skills Section (data analyst / developer / research methods) */}
      <motion.section variants={FADE_IN_VARIANTS} className="mb-20">
        <h2 className="text-3xl font-headline text-primary/90 mb-8">{pageDict.technical_skills.title}</h2>
        <Accordion type="multiple" defaultValue={pageDict.technical_skills.categories.map((c) => c.category)} className="w-full">
          {pageDict.technical_skills.categories.map((category, index) => {
            const Icon = iconMap[category.icon];
            return (
              <AccordionItem key={index} value={category.category}>
                <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className="w-6 h-6 text-accent" />}
                    <span>{category.category}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="p-4 rounded-lg bg-card border">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-primary/90">{skill.name}</h4>
                          <Badge variant="outline">{skill.level}</Badge>
                        </div>
                        <Progress value={skill.percentage} className="mb-3 h-1.5" />
                        <p className="text-sm text-foreground/70 mb-2">{skill.description}</p>
                        {skill.training && (
                          <p className="text-xs text-foreground/60 italic">
                            <strong>{pageDict.technical_skills.trainingLabel}:</strong> {skill.training}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </motion.section>

      {/* Languages Section */}
      <motion.section variants={FADE_IN_VARIANTS} className="mb-20">
        <h2 className="text-3xl font-headline text-primary/90 mb-8 flex items-center gap-3">
          <Languages className="w-8 h-8 text-accent" />
          {pageDict.languages.title}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {pageDict.languages.languages.map((lang, index) => (
            <motion.div key={index} custom={index} variants={FADE_IN_VARIANTS}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex justify-between items-baseline">
                    <CardTitle className="text-xl">{lang.language}</CardTitle>
                    <Badge variant="secondary">{lang.level}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={lang.percentage} className="mb-4 h-2" />
                  {lang.certificate && (
                    <p className="text-sm text-foreground/80">
                      <strong>{lang.certificate}</strong>
                      {lang.institution && ` - ${lang.institution}`}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Additional Training */}
      <motion.section variants={FADE_IN_VARIANTS}>
        <h2 className="text-3xl font-headline text-primary/90 mb-6 flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-accent" />
          {pageDict.additionalTraining.title}
        </h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {pageDict.additionalTraining.courses.map((course, index) => (
                <li key={index} className="flex items-start justify-between gap-3 border-b border-border/50 pb-3 last:border-b-0">
                  <div>
                    <p className="font-medium text-foreground/90">{course.name}</p>
                    <p className="text-sm text-foreground/60">{course.institution}</p>
                  </div>
                  <Badge variant="outline" className="whitespace-nowrap">
                    {course.hours}h
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.section>
    </motion.div>
  );
}
