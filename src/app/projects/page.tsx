'use client';

import { useLanguage } from '@/lib/hooks/use-language';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProjectGallery } from '@/components/project-gallery';
import type { Project } from '@/lib/types';
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
  School,
  Globe,
  Search,
  Wrench,
  BookOpen,
  Dices,
  BarChart3,
  FlaskConical,
  Network,
  Heart,
  Timer,
  ExternalLink,
  Images,
} from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  architecture: Layers,
  security: ShieldCheck,
  validation: Users,
  deployment: Rocket,
  school: School,
  globe: Globe,
  search: Search,
  tools: Wrench,
  book: BookOpen,
  dice: Dices,
  chart: BarChart3,
  database: Database,
  flask: FlaskConical,
  network: Network,
  heart: Heart,
  timer: Timer,
};

export default function ProjectsPage() {
  const { dictionary, language, isTransitioning } = useLanguage();
  const pageDict = dictionary.projects;
  const projects = pageDict.items as unknown as Project[];

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
        {projects.map((project, projectIndex) => (
          <motion.div key={project.id} variants={FADE_IN_VARIANTS} id={project.id} className="scroll-mt-24">
            <Card
              className={cn(
                'overflow-hidden shadow-xl border-2',
                projectIndex === 0 ? 'border-primary/30' : 'border-primary/10'
              )}
            >
              <CardHeader className="bg-card/50 border-b">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <Badge variant={projectIndex === 0 ? 'default' : 'secondary'} className="mb-3">
                      {project.flagshipLabel}
                    </Badge>
                    <CardTitle className="text-2xl md:text-3xl font-headline text-primary">{project.name}</CardTitle>
                    <CardDescription className="text-base mt-2 max-w-3xl">{project.tagline}</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2 md:justify-end md:max-w-xs">
                    {project.links.map((link) => (
                      <Button key={link.url} asChild variant="outline" size="sm">
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.label} <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                        </a>
                      </Button>
                    ))}
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

                {/* Ecosystem (AulaMetrics: platform + free resources web) */}
                {project.ecosystem && (
                  <div className="rounded-lg border-2 border-accent/30 bg-accent/5 p-6 space-y-6">
                    <div>
                      <h3 className="font-headline text-2xl text-primary mb-2">{project.ecosystem.title}</h3>
                      <p className="text-foreground/80 leading-relaxed max-w-4xl">{project.ecosystem.intro}</p>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-6">
                      {project.ecosystem.parts.map((part) => {
                        const Icon = iconMap[part.icon];
                        return (
                          <Card key={part.title} className="bg-card h-full flex flex-col">
                            <CardHeader className="flex flex-row items-center gap-3 pb-2">
                              {Icon && <Icon className="w-6 h-6 text-accent flex-shrink-0" />}
                              <CardTitle className="text-lg">{part.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col flex-1 gap-4">
                              <p className="text-sm text-foreground/80 leading-relaxed">{part.description}</p>
                              {part.stats && (
                                <div className="grid grid-cols-2 gap-3">
                                  {part.stats.map((stat) => (
                                    <div key={stat.label} className="rounded-md bg-muted/50 px-3 py-2">
                                      <div className="text-2xl font-headline text-primary leading-none">{stat.value}</div>
                                      <div className="text-xs text-foreground/70 mt-1">{stat.label}</div>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {part.link && (
                                <a
                                  href={part.link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                                >
                                  {part.link.label} <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Screenshots */}
                <div>
                  <h3 className="font-headline text-xl text-primary/90 mb-4 flex items-center gap-2">
                    <Images className="w-5 h-5 text-accent" /> {project.galleryTitle}
                  </h3>
                  <ProjectGallery groups={project.galleries} name={project.name} />
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

                {/* Feature cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  {project.features.map((feature) => {
                    const Icon = iconMap[feature.icon];
                    return (
                      <Card key={feature.title} className="bg-muted/40 h-full">
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

                {/* Why it matters */}
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
