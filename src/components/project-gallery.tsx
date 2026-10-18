'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { projectImages } from '@/lib/project-images';
import { cn } from '@/lib/utils';

export interface GalleryImage {
  image: string;
  caption: string;
}

export interface GalleryGroup {
  title: string;
  images: GalleryImage[];
}

function GalleryViewer({ images, name }: { images: GalleryImage[]; name: string }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const current = images[index];
  const src = projectImages[current.image];
  const go = (delta: number) => setIndex((i) => (i + delta + images.length) % images.length);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  };

  return (
    <div className="space-y-3" onKeyDown={onKeyDown}>
      <div className="relative group rounded-lg border bg-muted/40 overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative block w-full aspect-[16/10] cursor-zoom-in"
          aria-label={current.caption}
        >
          <Image
            src={src}
            alt={`${name}: ${current.caption}`}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-contain"
          />
          <span className="absolute right-3 top-3 rounded-md bg-background/80 p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
            <Maximize2 className="h-4 w-4" />
          </span>
        </button>
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow hover:bg-background"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow hover:bg-background"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      <p className="text-sm text-foreground/70 min-h-[2.5rem]">
        <span className="text-foreground/40 tabular-nums mr-2">
          {index + 1}/{images.length}
        </span>
        {current.caption}
      </p>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.image}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={img.caption}
              aria-current={i === index}
              className={cn(
                'relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border-2 bg-muted/40 transition-opacity',
                i === index ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'
              )}
            >
              <Image src={projectImages[img.image]} alt="" fill sizes="96px" className="object-cover object-top" />
            </button>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl w-[95vw] p-3 gap-2" onKeyDown={onKeyDown}>
          <DialogTitle className="sr-only">{name}</DialogTitle>
          <DialogDescription className="sr-only">{current.caption}</DialogDescription>
          <div className="relative w-full aspect-[16/10]">
            <Image src={src} alt={`${name}: ${current.caption}`} fill sizes="95vw" className="object-contain" />
          </div>
          <p className="text-sm text-foreground/80 text-center">{current.caption}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function ProjectGallery({ groups, name }: { groups: GalleryGroup[]; name: string }) {
  if (groups.length === 1) {
    return <GalleryViewer images={groups[0].images} name={name} />;
  }
  return (
    <Tabs defaultValue="0">
      <TabsList className="mb-4 h-auto flex-wrap">
        {groups.map((g, i) => (
          <TabsTrigger key={i} value={String(i)}>
            {g.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {groups.map((g, i) => (
        <TabsContent key={i} value={String(i)} className="mt-0">
          <GalleryViewer images={g.images} name={name} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
