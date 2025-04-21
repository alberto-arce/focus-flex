import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        {/* Cool clock SVG */}
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="mb-3">
          <circle cx="36" cy="36" r="32" fill="#3ec7e0" fillOpacity="0.10" />
          <circle cx="36" cy="36" r="28" stroke="#3ec7e0" strokeWidth="2.5" fill="none" />
          <circle cx="36" cy="36" r="3" fill="#3ec7e0" />
          <line
            x1="36"
            y1="36"
            x2="36"
            y2="18"
            stroke="#3ec7e0"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="36"
            y1="36"
            x2="52"
            y2="36"
            stroke="#3ec7e0"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        <p className="text-lg text-muted-foreground text-center max-w-md">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
          <br />
          Check the URL or go back to your focus session.
        </p>
        <Link
          href="/"
          className="mt-4 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
