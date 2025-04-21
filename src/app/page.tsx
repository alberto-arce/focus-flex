'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { FocusTimerDisplay } from '@/components/focus/focus-timer-display';
import { FocusTimerControls } from '@/components/focus/focus-timer-controls';
import { FocusTaskInput } from '@/components/focus/focus-task-input';
import { ThemeToggle } from '@/components/theme-toggle';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { NotificationPermissionBanner } from '@/components/focus/notification-permission';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main
      className="min-h-screen flex flex-col items-center text-foreground"
      style={{ background: 'var(--background)' }}
    >
      <NotificationPermissionBanner />
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-8 md:p-10 space-y-8">
        <header className="flex items-center justify-between border-b pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Focus Flex</h1>
          </div>
          <ThemeToggle />
        </header>
        <section>
          <Tabs defaultValue="tasks" className="w-full">
            <TabsContent value="tasks" className="space-y-4 mt-2 animate-fade-in">
              <FocusTaskInput />
              <FocusTimerDisplay />
              <FocusTimerControls />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </main>
  );
}
