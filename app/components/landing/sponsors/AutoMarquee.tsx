"use client";

import Marquee from "react-fast-marquee";
import { useEffect, useRef, useState } from "react";

type AutoMarqueeProps = {
  row: React.ReactNode;
  speed?: number;
  gradient?: boolean;
  direction?: "left" | "right";
  centerWhenStatic?: boolean;
  className?: string;
};

export default function AutoMarquee({
  row,
  speed = 35,
  gradient = false,
  direction = "left",
  centerWhenStatic = true,
  className = "",
}: AutoMarqueeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const check = () =>
      setOverflow(measure.scrollWidth > container.clientWidth + 1);

    const ro = new ResizeObserver(check);
    ro.observe(container);
    ro.observe(measure);

    const t1 = setTimeout(check, 60);
    const t2 = setTimeout(check, 250);

    return () => {
      ro.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {overflow ? (
        <Marquee
          speed={speed}
          gradient={gradient}
          direction={direction}
          pauseOnHover
          pauseOnClick
          className="select-none"
        >
          {row}
        </Marquee>
      ) : (
        <div className={centerWhenStatic ? "flex justify-center" : ""}>
          {row}
        </div>
      )}

      <div
        ref={measureRef}
        aria-hidden
        className="absolute opacity-0 pointer-events-none -z-10"
        style={{ position: "absolute", left: -99999, top: -99999 }}
      >
        {row}
      </div>
    </div>
  );
}
