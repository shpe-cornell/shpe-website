"use client";
import { useState, useEffect } from "react";
import { Changa } from "next/font/google";

const changa = Changa({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();

      // -----------------------------------------------------------------------
      // CHANGE THE DATE FOR NEXT YEAR HERE
      // -----------------------------------------------------------------------
      const target = new Date(2025, 9, 29);

      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("👩‍💻 🎉 Time for Conference! 🎉 👨‍💻");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `Countdown to Conference: ${days}d ${hours}h ${minutes}m ${seconds}s`
      );
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`text-center text-3xl text-[#6293e1] ${changa.className}`}>
      {timeLeft}
    </div>
  );
}
