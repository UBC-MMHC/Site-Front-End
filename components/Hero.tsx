"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface HeroProps {
    imageSrcs?: string[];
    videoSrc?: string;
    overlay?: boolean;
    intervalMs?: number;
    children?: React.ReactNode;
}

export default function Hero({
    imageSrcs,
    videoSrc,
    overlay = true,
    intervalMs = 10000,
    children,
}: HeroProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!imageSrcs || imageSrcs.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((i) => (i + 1) % imageSrcs.length);
        }, intervalMs);

        return () => clearInterval(interval);
    }, [imageSrcs, intervalMs]);

    return (
        <div className="relative h-screen w-full overflow-hidden">
            <div className="absolute inset-0 z-0">
                {videoSrc ? (
                    <video
                        className="h-full w-full object-cover"
                        src={videoSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                ) : (
                    imageSrcs?.map((src, index) => (
                        <Image
                            key={src}
                            src={src}
                            alt="Hero background"
                            fill
                            priority={index === 0}
                            className={`absolute inset-0 object-cover brightness-80 transition-opacity duration-2500 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"} `}
                        />
                    ))
                )}

                {overlay && <div className="absolute inset-0 bg-black/30" />}
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full items-center justify-center px-4 text-center text-white">
                {children}
            </div>
        </div>
    );
}
