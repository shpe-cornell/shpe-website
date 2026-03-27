"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import styles from "./Bear404Sprite.module.css";

type Bear404SpriteProps = {
  duration?: number;
  loop?: boolean;
  pauseOnHover?: boolean;
  size?: number;
  className?: string;
};

const TOTAL_FRAMES: number = 10;
const COLUMNS: number = 5;
const ROWS: number = 2;

export default function Bear404Sprite({
  duration = 1.6,
  loop = true,
  pauseOnHover = false,
  size = 240,
  className,
}: Bear404SpriteProps) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const msPerFrame = Math.max((duration * 1000) / TOTAL_FRAMES, 16);

  useEffect(() => {
    if (pauseOnHover && isHovered) return;
    if (!loop && frameIndex >= TOTAL_FRAMES - 1) return;

    const interval = window.setInterval(() => {
      setFrameIndex((prev) => {
        if (prev >= TOTAL_FRAMES - 1) {
          return loop ? 0 : prev;
        }
        return prev + 1;
      });
    }, msPerFrame);

    return () => window.clearInterval(interval);
  }, [frameIndex, loop, msPerFrame, pauseOnHover, isHovered]);

  const frameStyle = useMemo(() => {
    /*
      The sheet is 5 columns x 2 rows (10 total frames), not 4x2.
      We map each frame index to grid coordinates in reading order:
      row 1 => 0,1,2,3,4
      row 2 => 5,6,7,8,9

      col = index % 5
      row = floor(index / 5)

      With background-size: 500% 200%, each viewport shows exactly one frame.
      Positions are snapped to exact column/row percentages to avoid jitter.

      If you swap to a different sheet later, update COLUMNS / ROWS / TOTAL_FRAMES.
      The coordinate math below continues to work as long as frames are evenly sized.
    */
    const col = frameIndex % COLUMNS;
    const row = Math.floor(frameIndex / COLUMNS);

    const x = COLUMNS === 1 ? 0 : (col / (COLUMNS - 1)) * 100;
    const y = ROWS === 1 ? 0 : (row / (ROWS - 1)) * 100;

    return {
      "--sprite-size": `${size}px`,
      "--sheet-cols": String(COLUMNS),
      "--sheet-rows": String(ROWS),
      "--frame-x": `${x}%`,
      "--frame-y": `${y}%`,
    } as CSSProperties;
  }, [frameIndex, size]);

  return (
    <div
      className={[styles.wrapper, className ?? ""].filter(Boolean).join(" ")}
      style={frameStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      <div className={styles.sprite} />
    </div>
  );
}
