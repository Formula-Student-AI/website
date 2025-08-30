'use client';

import { useState, useEffect } from 'react';
import { ClockIcon } from 'lucide-react';

export function WhenCard({
  date,
  dateLine,
  timeRangeLine,
}: {
  date: Date;
  dateLine: string;
  timeRangeLine: string;
}) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const eventTime = date.getTime();
      const difference = eventTime - now;

      if (difference <= 0) {
        setTimeLeft('Event has started');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const parts = [];
      if (days > 0 || parts.length > 0) parts.push(`${days}d`);
      if (hours > 0 || parts.length > 0) parts.push(`${hours}h`);
      if (minutes > 0 || parts.length > 0) parts.push(`${minutes}m`);
      if (seconds > 0 || parts.length > 0) parts.push(`${seconds}s`);

      setTimeLeft(parts.join(' ') || 'Starting soon');
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000); // Update every second

    return () => clearInterval(timer);
  }, [date]);

  return (
    <div className="rounded-xl shadow-sm bg-gray-50 p-4 md:p-6">
      <div className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        When
      </div>
      <div className="mt-2">
        <div className="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {dateLine}
        </div>
        <div className="text-sm md:text-base text-zinc-600 dark:text-zinc-400">
          {timeRangeLine}
        </div>
        <div className="border-b border-zinc-200 my-4" />
        <div className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Countdown
        </div>
        <div className="mt-2 w-fit text-logo-blue font-medium flex items-center gap-2">
          <ClockIcon className="w-4 h-4" />
          <span className="border-b-2 border-university-red">{timeLeft}</span>
        </div>
      </div>
    </div>
  );
}
