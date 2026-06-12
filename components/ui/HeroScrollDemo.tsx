"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pb-[100px] pt-[50px] bg-black/40 border-t border-white/5 relative z-10">
      <ContainerScroll
        titleComponent={
          <>
            <h2 className="text-2xl font-mono text-amber-500/80 tracking-widest uppercase mb-4 text-center">
              Visual Presentation
            </h2>
            <h1 className="text-4xl font-extrabold text-white sm:text-6xl tracking-tight leading-none uppercase font-mono text-center">
              Interactive <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 drop-shadow-[0_2px_10px_rgba(245,158,11,0.2)]">
                Scroll Canvas
              </span>
            </h1>
          </>
        }
      >
        <Image
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1400&auto=format&fit=crop"
          alt="Developer Workspace Mockup"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
          priority
        />
      </ContainerScroll>
    </div>
  );
}
