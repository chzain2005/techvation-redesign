"use client"; // Ticks every second in the browser.

import { useEffect, useState } from "react";
import { solutionsPage } from "@/data/solutions";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

/** Splits the time left until `target` into days, hours, minutes and seconds. */
function timeLeft(target: number): Parts {
  const total = Math.max(0, Math.floor((target - Date.now()) / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

/**
 * Four glass boxes counting down to the launch date in data/solutions.ts.
 * It stops at 00 when the date has passed.
 *
 * The page is built ahead of time, when "now" is unknown, so the boxes show
 * "--" until the browser takes over a moment later.
 */
export default function Countdown({ launchDate }: { launchDate: string }) {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const target = new Date(launchDate).getTime();
    const tick = () => setParts(timeLeft(target));
    const first = setTimeout(tick, 0);
    const timer = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, [launchDate]);

  const labels = solutionsPage.countdownLabels;
  const units: Array<keyof Parts> = ["days", "hours", "minutes", "seconds"];

  return (
    <div
      role="timer"
      aria-label={
        parts
          ? `${parts.days} ${labels.days}, ${parts.hours} ${labels.hours}, ${parts.minutes} ${labels.minutes} left`
          : undefined
      }
      className="grid w-full max-w-107 grid-cols-4 gap-2.5 md:gap-3.5"
    >
      {units.map((unit) => (
        <div
          key={unit}
          aria-hidden
          className="flex flex-col items-center gap-0.5 rounded-float border border-white/14 bg-white/6 py-3 backdrop-blur-md md:gap-1 md:py-4.25"
        >
          <span className="font-heading text-h2-sm font-bold text-white tabular-nums md:text-h3">
            {parts ? String(parts[unit]).padStart(2, "0") : "--"}
          </span>
          <span className="text-caption font-medium text-white/60">{labels[unit]}</span>
        </div>
      ))}
    </div>
  );
}
