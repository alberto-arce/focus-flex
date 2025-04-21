'use client';

import { useFocusContext } from '@/providers/focus-provider';

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function FocusTimerDisplay() {
  const { state } = useFocusContext();
  return (
    <div className="flex flex-col items-center">
      <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-primary/70 to-accent/60 flex items-center justify-center shadow-lg mb-4">
        <span className="text-5xl font-mono text-foreground">{formatTime(state.currentTime)}</span>
      </div>
      <div className="text-sm text-muted-foreground capitalize">
        {state.mode === 'work'
          ? 'Focus Session'
          : state.mode === 'shortBreak'
            ? 'Short Break'
            : 'Long Break'}
      </div>
    </div>
  );
}
