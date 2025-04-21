'use client';

import { RotateCcw } from 'lucide-react';
import { useFocusContext } from '@/providers/focus-provider';
import { Button } from '@/components/ui/button';

export function FocusTimerControls() {
  const { state, actions } = useFocusContext();

  if (!state.currentTask || state.currentTime === 0) return null;
  return (
    <div className="flex gap-4 mt-4 w-full justify-center">
      {state.isActive ? (
        <Button
          variant="default"
          className="flex items-center gap-2 px-5 py-2 rounded-full font-bold shadow transition text-base md:text-base"
          onClick={actions.resetTimer}
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </Button>
      ) : (
        <Button
          variant="secondary"
          className="flex items-center gap-2 px-5 py-2 rounded-full font-bold shadow transition text-base md:text-base"
          onClick={actions.startTimer}
        >
          Start
        </Button>
      )}
    </div>
  );
}
