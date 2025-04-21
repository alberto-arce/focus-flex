'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function NotificationPermissionBanner() {
  const [visible, setVisible] = useState(false);
  const [permission, setPermission] = useState(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default',
  );

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        setVisible(true);
      }
    }
  }, []);

  const handleAllow = () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission().then((perm) => {
        setPermission(perm);
        setVisible(false);
      });
    }
  };

  const handleDismiss = () => {
    setVisible(false);
  };

  if (!visible || permission !== 'default') return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-card/95 backdrop-blur border border-primary/30 shadow-xl rounded-xl px-8 py-6 flex flex-col sm:flex-row items-center gap-4 max-w-lg w-full animate-fade-in">
      <div className="flex-1">
        <div className="font-semibold text-base mb-2">Enable notifications?</div>
        <div className="text-sm text-muted-foreground mb-2">
          Get a sound and notification when you finish a focus session—even in another tab!
        </div>
        <div className="text-xs text-yellow-600 mb-1">
          <strong>Mobile:</strong> Works only while Focus Flex is open. Background support coming
          soon.
        </div>
      </div>
      <div className="flex flex-col gap-2 min-w-[120px]">
        <Button
          className="button-gradient px-4 py-1.5 rounded-lg font-bold text-white shadow hover:scale-105 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          onClick={handleAllow}
          aria-label="Allow notifications"
        >
          Allow
        </Button>
        <Button
          variant="secondary"
          className="px-4 py-1.5 rounded-lg bg-muted text-muted-foreground font-semibold border border-primary/20 shadow hover:bg-muted/90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          onClick={handleDismiss}
          aria-label="Dismiss notification permission banner"
        >
          No, thanks
        </Button>
      </div>
    </div>
  );
}
