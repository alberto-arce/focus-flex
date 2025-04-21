import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import { FocusProvider } from '@/providers/focus-provider';
import { TaskProvider } from '@/providers/task-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Focus Flex: Focus Timer',
  description:
    'Focus Flex is a beautiful, distraction-free focus timer app. Boost your productivity with a minimalist interface, keyboard accessibility, and motivational feedback. Perfect for deep work, study, and flow.',
  keywords: [
    'Focus Flex',
    'Focus Timer',
    'Productivity',
    'Deep Work',
    'Minimalist Timer',
    'Study Timer',
    'Flow',
    'Motivation',
    'Task Timer',
    'Distraction-Free',
    'Work Timer',
    'Concentration',
    'Time Management',
    'Focus App',
    'Next.js',
    'PWA',
  ],
  authors: [{ name: 'Briapps', url: 'https://briapps.com.ar' }],
  openGraph: {
    title: 'Focus Flex: Focus Timer',
    description:
      'A beautiful, accessible focus timer app for productivity and deep work.',
    url: 'https://focusflex.briapps.com.ar',
    siteName: 'Focus Flex',
    images: [
      {
        url: '/focusflex-og.png',
        width: 1200,
        height: 630,
        alt: 'Focus Flex App Screenshot',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focus Flex: Focus Timer',
    description:
      'A beautiful, accessible focus timer app for productivity and deep work.',
    creator: '@briapps',
    images: ['/focusflex-og.png'],
  },
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  metadataBase: new URL('https://focusflex.briapps.com.ar'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, theme-color:#3ec7e0" />
        <meta name="theme-color" content="#3ec7e0" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <FocusProvider>
            <TaskProvider>{children}</TaskProvider>
          </FocusProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
