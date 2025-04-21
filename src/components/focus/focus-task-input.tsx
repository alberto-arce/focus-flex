'use client';

import { useState, useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useFocusContext } from '@/providers/focus-provider';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const MIN_SECONDS = 60;
const MAX_MINUTES = 90;
const SUCCESS_DISPLAY_MS = 5000;

export function FocusTaskInput() {
  const { state, actions } = useFocusContext();
  const [seconds, setSeconds] = useState(state.workDuration);
  const [task, setTask] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const successTimeout = useRef<NodeJS.Timeout | null>(null);

  const canEdit = !state.isActive && state.currentTime === state.workDuration;
  const timerJustFinished = !state.isActive && state.currentTime === 0;

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      actions.setWorkDuration(seconds);
      actions.setCurrentTask(task.trim());
      actions.resetTimer();
      actions.startTimer();
    }
  };

  useEffect(() => {
    if (timerJustFinished && state.currentTask) {
      setShowSuccess(true);
      setTask('');
      successTimeout.current = setTimeout(() => {
        setShowSuccess(false);
        actions.setCurrentTask('');
      }, SUCCESS_DISPLAY_MS);
    }
    if (canEdit) {
      setTask('');
    }
    return () => {
      if (successTimeout.current) clearTimeout(successTimeout.current);
    };
  }, [timerJustFinished, state.currentTask, canEdit, actions]);

  const minMinutes = Math.floor(seconds / 60);
  const minSeconds = seconds % 60;
  const timeLabel =
    seconds < 60
      ? `${seconds} sec`
      : minSeconds === 0
        ? `${minMinutes} min`
        : `${minMinutes} min ${minSeconds} sec`;

  return (
    <div
      className="bg-card rounded-xl shadow p-6 flex flex-col gap-6 items-center relative min-h-[190px]"
      style={{ minHeight: 220 }}
    >
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="flex flex-col items-center gap-4 w-full max-w-sm animate-fade-in absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            role="status"
            aria-live="polite"
          >
            <motion.div
              className="flex items-center gap-2 text-green-600"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10, delay: 0.2 }}
            >
              <CheckCircle2 className="w-6 h-6" aria-label="Task completed" />
              <span className="font-semibold">Great job! Task completed.</span>
            </motion.div>
            <div className="text-xs text-muted-foreground mt-1 text-center">
              Ready for your next focus?
            </div>
            <motion.div
              className="confetti"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              aria-hidden="true"
            >
              {[...Array(18)].map((_, i) => (
                <span key={i} className={`confetti-dot confetti-dot-${i}`} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!showSuccess && (
          <motion.form
            key="form"
            onSubmit={handleStart}
            className="flex flex-col gap-4 w-full max-w-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, type: 'spring' }}
            role="form"
            aria-label="Focus task input form"
          >
            <Input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="What will you focus on?"
              disabled={showSuccess || state.isActive}
              required
              autoFocus
              aria-label="Task description"
            />
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="focus-seconds"
                className="text-sm font-medium text-center"
                id="focus-seconds-label"
              >
                Focus time: <span className="font-bold text-primary">{timeLabel}</span>
              </label>
              <Slider
                id="focus-seconds"
                min={MIN_SECONDS}
                max={MAX_MINUTES * 60}
                step={5}
                value={[seconds]}
                onValueChange={([val]) => setSeconds(val)}
                className="w-full accent-primary"
                disabled={showSuccess || state.isActive}
                aria-labelledby="focus-seconds-label"
              />
            </div>
            <Button
              type="submit"
              className="w-full mt-2"
              disabled={!task.trim() || seconds < MIN_SECONDS}
              aria-label="Start focus session"
            >
              Start
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
