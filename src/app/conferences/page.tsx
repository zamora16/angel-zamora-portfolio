'use client';

import { useLanguage } from '@/lib/hooks/use-language';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Globe, Presentation } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Bar, BarChart as RechartsBarChart, Pie, PieChart as RechartsPieChart, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

const FADE_IN_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ConferencesPage() {
  const { dictionary, language, isTransitioning } = useLanguage();
  const pageDict = dictionary.conferences;

  const chartConfigScope = {
    international: { label: pageDict.metrics.byScope.international.label, color: 'hsl(var(--primary))' },
    national: { label: pageDict.metrics.byScope.national.label, color: 'hsl(var(--accent))' },
  };

  const chartConfigType = {
    poster: { label: pageDict.metrics.byType.poster.label, color: 'hsl(var(--primary))' },
    oral: { label: pageDict.metrics.byType.oral.label, color: 'hsl(var(--accent))' },
  };

  const scopeData = [
    { name: pageDict.metrics.byScope.international.label, value: pageDict.metrics.byScope.international.count, fill: 'hsl(var(--primary))' },
    { name: pageDict.metrics.byScope.national.label, value: pageDict.metrics.byScope.national.count, fill: 'hsl(var(--accent))' },
  ];

  const typeData = [
    { name: pageDict.metrics.byType.poster.label, value: pageDict.metrics.byType.poster.count, fill: 'hsl(var(--primary))' },
    { name: pageDict.metrics.byType.oral.label, value: pageDict.metrics.byType.oral.count, fill: 'hsl(var(--accent))' },
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

      {/* Hero Stats */}
      <motion.div variants={FADE_IN_VARIANTS} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-center">
        <Card className="bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex flex-col items-center gap-2">
              <Users className="w-10 h-10 text-accent" />
              <span>{pageDict.summary.total}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/70">{pageDict.summary.description}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col items-center gap-2">
              <Globe className="w-10 h-10 text-accent" />
              <span>{pageDict.metrics.byScope.international.percentage}%</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/70">{pageDict.metrics.byScope.international.label}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col items-center gap-2">
              <Presentation className="w-10 h-10 text-accent" />
              <span>{pageDict.metrics.byType.poster.percentage}%</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/70">{pageDict.metrics.byType.poster.label}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        <motion.div variants={FADE_IN_VARIANTS} className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{pageDict.metrics.byYear.title}</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ChartContainer config={{}} className="w-full h-full">
                <RechartsBarChart data={pageDict.metrics.byYear.data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                  <XAxis dataKey="year" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent />} />
                  <Bar dataKey="count" radius={4}>
                    {pageDict.metrics.byYear.data.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </RechartsBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={FADE_IN_VARIANTS} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>{pageDict.metrics.byScope.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center h-40">
              <ChartContainer config={chartConfigScope} className="w-full h-full">
                <RechartsPieChart>
                  <Tooltip content={<ChartTooltipContent />} />
                  <Pie data={scopeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} />
                </RechartsPieChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{pageDict.metrics.byType.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center h-40">
              <ChartContainer config={chartConfigType} className="w-full h-full">
                <RechartsPieChart>
                  <Tooltip content={<ChartTooltipContent />} />
                  <Pie data={typeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} />
                </RechartsPieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Featured Conferences Timeline */}
      <motion.section variants={FADE_IN_VARIANTS} className="mb-16">
        <h2 className="text-3xl font-headline text-primary/90 mb-8 text-center">{pageDict.highlights.title}</h2>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-0.5 h-full bg-border" aria-hidden="true"></div>
          {pageDict.highlights.conferences.map((conf, index) => (
            <motion.div
              key={index}
              className="relative mb-12"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={FADE_IN_VARIANTS}
              transition={{ delay: index * 0.1 }}
            >
              <div className="absolute top-1 left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 border-4 border-background"></div>
              <Card
                className="ml-12 md:ml-0 md:w-5/12 md:relative hover:shadow-lg transition-shadow"
                style={index % 2 === 0 ? { left: 'calc(50% + 2.5rem)' } : { left: 'calc(-2.5rem)' }}
              >
                <CardHeader>
                  <CardDescription>
                    {conf.year} &middot; {conf.location}
                  </CardDescription>
                  <CardTitle className="text-lg text-primary/90">{conf.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-foreground/90">{conf.type}</p>
                  <Badge variant="outline" className="mt-2">
                    {conf.scope}
                  </Badge>
                  <p className="mt-3 text-sm text-foreground/70 italic">&ldquo;{conf.highlight}&rdquo;</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Other sections */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Countries */}
        <motion.div variants={FADE_IN_VARIANTS}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{pageDict.metrics.byCountry.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {pageDict.metrics.byCountry.countries.map((country) => (
                  <li key={country.name} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                    <span className="flex items-center gap-3">
                      <span className="text-xl">{country.flag}</span> {country.name}
                    </span>
                    <Badge variant="secondary">{country.count}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Topics */}
        <motion.div variants={FADE_IN_VARIANTS}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{pageDict.topics.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {pageDict.topics.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
