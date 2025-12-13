// app/components/Hero.tsx
import Image from "next/image";
import React from "react";

interface HeroProps {
  imageSrc?: string;
  videoSrc?: string;
  overlay?: boolean;
  children?: React.ReactNode;
}

export default function Hero({ imageSrc, videoSrc, overlay = true, children }: HeroProps) {
  return (
    <div className="relative w-full h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 z-10">
        {videoSrc ? (
          <video className="w-full h-full object-cover" src={videoSrc} autoPlay muted loop playsInline />
        ) : imageSrc ? (
          <Image src={imageSrc} alt="Hero background" fill className="object-cover  brightness-80" priority />
        ) : (
          <div className="bg-gray-900 w-full h-full" />
        )}
        {/* // TODO change overlay dim setting when adding imagae !! */}
        {overlay && <div className="absolute inset-0 bg-black/10" />}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">{children}</div>
    </div>
  );
}
