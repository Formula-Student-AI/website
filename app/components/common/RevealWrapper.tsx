"use client";

import { useInView } from "@/app/hooks/useInView";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "scale";
  delayMs?: number;
};

export default function RevealWrapper({
  children,
  direction = "up",
  delayMs = 0,
}: Props) {
  const { ref, visible } = useInView<HTMLDivElement>({
    threshold: 0.2,
    once: true,
  });

  const revealFrom =
    direction === "up"
      ? "translateY(24px)"
      : direction === "down"
      ? "translateY(-24px)"
      : direction === "left"
      ? "translateX(-24px)"
      : direction === "right"
      ? "translateX(24px)"
      : "scale(0.96)";

  return (
    <div
      ref={ref}
      className="opacity-0 will-change-[transform,opacity]"
      style={
        visible
          ? ({
              animation: "category-reveal 480ms ease-out forwards",
              animationDelay: `${delayMs}ms`,
              "--reveal-from": revealFrom,
            } as React.CSSProperties)
          : { transform: revealFrom }
      }
    >
      {children}
      <style jsx>{`
        @keyframes category-reveal {
          from {
            opacity: 0;
            transform: var(--reveal-from, translateY(24px));
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
