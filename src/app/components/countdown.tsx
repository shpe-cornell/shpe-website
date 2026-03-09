"use client";
import { useState, useEffect } from "react";
import { Changa } from "next/font/google";

const changa = Changa({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState("");
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();

      // -----------------------------------------------------------------------
      // CHANGE THE DATE FOR NEXT YEAR HERE
      // -----------------------------------------------------------------------
      const target = new Date(2026, 9, 28);

      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setIsLive(true);
        setTimeLeft("Time for Conference!");
        return;
      }
      setIsLive(false);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`text-center ${changa.className}`}>
      <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-[#9FC2FF]">
        Countdown To Conference
      </p>
      <p className="mt-2 text-3xl md:text-4xl font-bold text-white drop-shadow-[0_0_16px_rgba(114,169,190,0.35)]">
        {isLive ? "Time for Conference!" : timeLeft}
      </p>
    </div>
  );
}
