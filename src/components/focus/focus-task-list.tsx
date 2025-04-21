'use client';

import { useState, useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useFocusContext } from '@/providers/focus-provider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function FocusTaskInput() {
  const { state, actions } = useFocusContext();
  const actionsRef = useRef(actions);
  const [task, setTask] = useState('');
  const [completedTask, setCompletedTask] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    actionsRef.current = actions;
  }, [actions]);

  const canEdit = !state.isActive && state.currentTime === state.workDuration;
  const timerJustFinished = !state.isActive && state.currentTime === 0;

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      actions.setCurrentTask(task.trim());
      actions.resetTimer();
      actions.startTimer();
    }
  };

  useEffect(() => {
    if (timerJustFinished && state.currentTask && !completedTask) {
      setCompletedTask(state.currentTask);
      actionsRef.current.setCurrentTask('');
      setShowNotification(true);
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Focus Flex', {
          body: `¡Tarea completada! (${state.currentTask})`,
        });
      } else if ('Notification' in window && Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification('Focus Flex', {
              body: `¡Tarea completada! (${state.currentTask})`,
            });
          }
        });
      }
      const audio = new Audio('/focus-done.mp3');
      audio.play();
    }
    if (canEdit) {
      setTask('');
      setShowNotification(false);
      setCompletedTask(null);
    }
  }, [timerJustFinished, state.currentTask, completedTask, canEdit]);

  return (
    <div className="bg-card rounded-xl shadow p-6 flex flex-col gap-6 items-center">
      {canEdit ? (
        <form onSubmit={handleStart} className="flex flex-col gap-4 w-full max-w-sm">
          <Input
            className="mb-2"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What do you want to focus on?"
            disabled={!canEdit}
            required
            aria-label="Task description"
          />
          <Button type="submit" className="w-full" disabled={!task.trim()} aria-label="Add task">
            Add
          </Button>
        </form>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <div className="text-lg font-semibold text-primary">
            {state.currentTask || completedTask}
          </div>
          {timerJustFinished && completedTask && showNotification && (
            <div className="flex flex-col items-center gap-2 animate-fade-in">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="w-5 h-5" />
                Task completed! Add a new one.
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                You will receive a notification each time you finish your focus.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
