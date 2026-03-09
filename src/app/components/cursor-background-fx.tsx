"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type CursorState = {
  x: number;
  y: number;
  tx: number;
  ty: number;
};

type Variant = {
  primary: string;
  secondary: string;
  tertiary: string;
  glowSize: number;
  blur: string;
  opacity: number;
};

const defaultVariant: Variant = {
  primary: "rgba(133,182,255,0.11)",
  secondary: "rgba(253,101,47,0.07)",
  tertiary: "rgba(255,255,255,0.02)",
  glowSize: 180,
  blur: "blur-2xl",
  opacity: 0.6,
};

const variantByPath = (pathname: string): Variant => {
  if (pathname.startsWith("/sponsorship")) {
    return {
      primary: "rgba(253,101,47,0.2)",
      secondary: "rgba(255,210,182,0.1)",
      tertiary: "rgba(133,182,255,0.03)",
      glowSize: 200,
      blur: "blur-2xl",
      opacity: 0.62,
    };
  }

  if (pathname.startsWith("/points")) {
    return {
      primary: "rgba(133,182,255,0.13)",
      secondary: "rgba(0,112,192,0.1)",
      tertiary: "rgba(253,101,47,0.03)",
      glowSize: 180,
      blur: "blur-2xl",
      opacity: 0.62,
    };
  }

  if (pathname.startsWith("/gallery")) {
    return {
      primary: "rgba(133,182,255,0.12)",
      secondary: "rgba(229,239,255,0.08)",
      tertiary: "rgba(253,101,47,0.03)",
      glowSize: 210,
      blur: "blur-3xl",
      opacity: 0.58,
    };
  }

  if (pathname.startsWith("/team")) {
    return {
      primary: "rgba(0,112,192,0.11)",
      secondary: "rgba(133,182,255,0.08)",
      tertiary: "rgba(253,101,47,0.03)",
      glowSize: 170,
      blur: "blur-2xl",
      opacity: 0.58,
    };
  }

  return defaultVariant;
};

export function CursorBackgroundFx() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const [cursor, setCursor] = useState<CursorState>({
    x: 50,
    y: 50,
    tx: 50,
    ty: 50,
  });

  const variant = useMemo(() => variantByPath(pathname), [pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const updateEnabled = () => setEnabled(mediaQuery.matches);
    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);
    return () => mediaQuery.removeEventListener("change", updateEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;

    const onMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      setCursor((prev) => ({ ...prev, x, y }));
    };

    const tick = () => {
      setCursor((prev) => ({
        ...prev,
        tx: prev.tx + (prev.x - prev.tx) * 0.05,
        ty: prev.ty + (prev.y - prev.ty) * 0.05,
      }));
      raf = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${variant.blur} transition-[width,height] duration-500`}
        style={{
          left: `${cursor.tx}%`,
          top: `${cursor.ty}%`,
          width: `${variant.glowSize}px`,
          height: `${variant.glowSize}px`,
          opacity: variant.opacity,
          background: `radial-gradient(circle, ${variant.primary} 0%, ${variant.secondary} 38%, transparent 72%)`,
        }}
      />
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
        style={{
          left: `${100 - cursor.tx}%`,
          top: `${100 - cursor.ty}%`,
          width: "95px",
          height: "95px",
          opacity: 0.35,
          background: `radial-gradient(circle, ${variant.tertiary} 0%, transparent 72%)`,
        }}
      />
    </div>
  );
}
