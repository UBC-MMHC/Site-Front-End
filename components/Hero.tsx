"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface HeroProps {
	imageSrcs?: string[];
	videoSrc?: string;
	overlay?: boolean;
	intervalMs?: number;
	showScrollHint?: boolean;
	children?: React.ReactNode;
}

export default function Hero({
	imageSrcs,
	videoSrc,
	overlay = true,
	intervalMs = 10000,
	showScrollHint = false,
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
		<section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
			<div className="absolute inset-0">
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
							alt=""
							fill
							priority={index === 0}
							className={`object-cover transition-opacity duration-[2500ms] ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
						/>
					))
				)}

				{overlay && (
					<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
				)}
			</div>

			<div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-20 pb-24 text-center text-white">
				{children}
			</div>

			{showScrollHint && (
				<div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
					<span className="eyebrow-on-dark text-[10px]">Scroll</span>
					<span className="block h-12 w-px bg-white/35" aria-hidden />
				</div>
			)}
		</section>
	);
}
