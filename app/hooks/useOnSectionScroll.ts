"use client";

import { useEffect } from "react";
import { clamp, easeOutCubic } from "@/lib/anim";

export function useSectionProgressVar(sectionRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    let ticking = false;

    const handle = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) { ticking = false; return; }

        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const sectionH = el.offsetHeight;

        const raw = clamp((0 - rect.top) / (sectionH - viewportH));
        const p = easeOutCubic(raw);

        el.style.setProperty("--p", String(p));
        ticking = false;
      });
    };

    handle();
    window.addEventListener("scroll", handle, { passive: true });
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
  }, [sectionRef]);
}