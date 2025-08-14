"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLockBodyScroll } from "@/app/hooks/useLockBodyScroll";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string | React.ReactNode;
  children: React.ReactNode;
  widthClass?: string;
  dialogMs?: number;
  overlayFadeMs?: number;
};

type Phase = "open" | "closing-dialog" | "closing-overlay";

export default function Modal({
  open,
  onClose,
  title,
  children,
  widthClass = "max-w-3xl",
  dialogMs = 220,
  overlayFadeMs = 160,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const [mounted, setMounted] = useState(open);
  const [phase, setPhase] = useState<Phase>("open");

  const [snapTitle, setSnapTitle] = useState<typeof title>(title);
  const [snapChildren, setSnapChildren] = useState<typeof children>(children);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setPhase("open");
      setSnapTitle(title);
      setSnapChildren(children);
    } else if (mounted) {
      setPhase("closing-dialog");
      const t1 = setTimeout(() => {
        setPhase("closing-overlay");
        const t2 = setTimeout(() => {
          setMounted(false);
          setSnapTitle(undefined);
          setSnapChildren(null as any);
        }, overlayFadeMs);
        return () => clearTimeout(t2);
      }, dialogMs);
      return () => clearTimeout(t1);
    }
  }, [open, mounted, title, children, dialogMs, overlayFadeMs]);

  useLockBodyScroll(mounted);

  // ESC handler
  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, onClose]);

  // autofocus dialog on open
  useEffect(() => {
    if (mounted && phase === "open") dialogRef.current?.focus();
  }, [mounted, phase]);

  if (!mounted) return null;

  const isClosing = phase !== "open";

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <button
        aria-label="Close overlay"
        onClick={onClose}
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          background: "rgba(0,0,0,0.40)",
          opacity: phase === "closing-overlay" ? 0 : 1,
          transition:
            phase === "closing-overlay"
              ? `opacity ${overlayFadeMs}ms linear`
              : "none",
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        ref={dialogRef}
        className="relative mx-4 w-full outline-none"
      >
        <div
          className={`w-full ${widthClass} rounded-2xl shadow-xl mx-auto`}
          style={{
            background: "white",
            animation: `${
              isClosing ? "card-out" : "card-in"
            } ${dialogMs}ms ease-out forwards`,
            willChange: "transform, opacity",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          <button
            onClick={onClose}
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            aria-label="Close"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {snapTitle ? (
            <div className="px-6 pt-6 pb-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {snapTitle}
              </h3>
            </div>
          ) : null}

          <div className="px-6 pb-6 pt-2">{snapChildren}</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes card-in {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes card-out {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(10px) scale(0.985);
          }
        }
      `}</style>
    </div>,
    document.body
  );
}
