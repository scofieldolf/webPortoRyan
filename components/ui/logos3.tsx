// This template requires the Embla Auto Scroll plugin to be installed:
//
// npm install embla-carousel-auto-scroll

"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const Logos3 = ({
  heading = "Trusted by these companies",
  logos = [
    {
      id: "logo-1",
      description: "Logo 1",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
      className: "h-7 w-auto filter invert brightness-0 dark:brightness-100 dark:invert-0",
    },
    {
      id: "logo-2",
      description: "Logo 2",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-wordmark.svg",
      className: "h-7 w-auto filter invert brightness-0 dark:brightness-100 dark:invert-0",
    },
    {
      id: "logo-3",
      description: "Logo 3",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/nextjs-wordmark.svg",
      className: "h-7 w-auto filter invert brightness-0 dark:brightness-100 dark:invert-0",
    },
    {
      id: "logo-4",
      description: "Logo 4",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-wordmark.svg",
      className: "h-7 w-auto filter invert brightness-0 dark:brightness-100 dark:invert-0",
    },
    {
      id: "logo-5",
      description: "Logo 5",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-wordmark.svg",
      className: "h-7 w-auto filter invert brightness-0 dark:brightness-100 dark:invert-0",
    },
    {
      id: "logo-6",
      description: "Logo 6",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/supabase-wordmark.svg",
      className: "h-7 w-auto filter invert brightness-0 dark:brightness-100 dark:invert-0",
    },
    {
      id: "logo-7",
      description: "Logo 7",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-wordmark.svg",
      className: "h-4 w-auto filter invert brightness-0 dark:brightness-100 dark:invert-0",
    },
    {
      id: "logo-8",
      description: "Logo 8",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-wordmark.svg",
      className: "h-7 w-auto filter invert brightness-0 dark:brightness-100 dark:invert-0",
    },
  ],
}: Logos3Props) => {
  return (
    <section className="py-24 border-y border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col items-center text-center">
        <h2 className="text-xl font-mono text-amber-500/80 tracking-widest uppercase mb-2">
          {heading}
        </h2>
        <div className="w-12 h-0.5 bg-amber-500/30 mb-8" />
      </div>
      <div className="relative mx-auto flex items-center justify-center max-w-5xl px-6">
        <Carousel
          opts={{ loop: true }}
          plugins={[AutoScroll({ playOnInit: true, stopOnInteraction: false, speed: 1 })]}
          className="w-full"
        >
          <CarouselContent className="ml-0 items-center">
            {logos.map((logo) => (
              <CarouselItem
                key={logo.id}
                className="flex basis-1/2 justify-center pl-0 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <div className="mx-6 flex shrink-0 items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300">
                  <img
                    src={logo.image}
                    alt={logo.description}
                    className={logo.className}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050200] to-transparent pointer-events-none z-10"></div>
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050200] to-transparent pointer-events-none z-10"></div>
      </div>
    </section>
  );
};

export { Logos3 };
export type { Logo, Logos3Props };
