'use client';

import { useLanguage } from '@/lib/hooks/use-language';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Layers,
  ShieldCheck,
  Users,
  Rocket,
  Lightbulb,
  Code2,
  Database,
  Sparkles,
} from 'lucide-react';

const featureIconMap: { [key: string]: React.ElementType } = {
  architecture: Layers,
  security: ShieldCheck,
  validation: Users,
  deployment: Rocket,
};

export default function ProjectsPage() {
  const { dictionary, language, isTransitioning } = useLanguage();
  const pageDict = dictionary.projects;

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

      <div className="space-y-16">
        {pageDict.items.map((project, projectIndex) => (
          <motion.div key={projectIndex} variants={FADE_IN_VARIANTS}>
            <Card className="overflow-hidden shadow-xl border-2 border-primary/10">
              <CardHeader className="bg-card/50 border-b">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <Badge variant="default" className="mb-3">
                      {project.flagshipLabel}
                    </Badge>
                    <CardTitle className="text-2xl md:text-3xl font-headline text-primary">{project.name}</CardTitle>
                    <CardDescription className="text-base mt-2">{project.tagline}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-8 space-y-10">
                {/* Problem -> Solution */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-headline text-xl text-primary/90 mb-3 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-accent" /> {project.problem.title}
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">{project.problem.description}</p>
                  </div>
                  <div>
                    <h3 className="font-headline text-xl text-primary/90 mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-accent" /> {project.solution.title}
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">{project.solution.description}</p>
                  </div>
                </div>

                {/* Tech stack */}
                <div>
                  <h3 className="font-headline text-xl text-primary/90 mb-4 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-accent" /> {project.stack.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Feature cards: architecture / security / validation / deployment */}
                <div className="grid md:grid-cols-2 gap-6">
                  {project.features.map((feature, featureIndex) => {
                    const Icon = featureIconMap[feature.icon];
                    return (
                      <Card key={featureIndex} className="bg-muted/40 h-full">
                        <CardHeader className="flex flex-row items-center gap-3 pb-2">
                          {Icon && <Icon className="w-6 h-6 text-accent flex-shrink-0" />}
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-foreground/80 leading-relaxed">{feature.description}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Why it matters for data analysis */}
                <div className="bg-accent/10 border-l-4 border-accent rounded-md p-6">
                  <h3 className="font-headline text-lg text-primary mb-2 flex items-center gap-2">
                    <Database className="w-5 h-5 text-accent" /> {project.dataAnalystNote.title}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">{project.dataAnalystNote.description}</p>
                </div>

                {/* Direction / credit */}
                <p className="text-sm text-foreground/60 italic">{project.credit}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
