'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // You can send the error to a monitoring service here
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        {/* Cool clock SVG for error */}
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="mb-3">
          <circle cx="36" cy="36" r="32" fill="#FBBF24" fillOpacity="0.10" />
          <circle cx="36" cy="36" r="28" stroke="#FBBF24" strokeWidth="2.5" fill="none" />
          <circle cx="36" cy="36" r="3" fill="#FBBF24" />
          {/* Clock hands at 10:10 for 'error' */}
          <line
            x1="36"
            y1="36"
            x2="46"
            y2="27"
            stroke="#FBBF24"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="36"
            y1="36"
            x2="27"
            y2="27"
            stroke="#FBBF24"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        <h1 className="text-3xl font-bold">Something Went Wrong</h1>
        <p className="text-lg text-muted-foreground text-center max-w-md">
          An unexpected error occurred.
          <br />
          Try reloading the page or return to your focus session.
        </p>
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => reset()}
            className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition"
          >
            Retry
          </button>
          <Link
            href="/"
            className="px-6 py-2 rounded-lg bg-muted text-foreground font-semibold shadow hover:bg-muted/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
