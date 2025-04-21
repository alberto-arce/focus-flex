'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

type FocusState = {
  currentTime: number;
  isActive: boolean;
  isPaused: boolean;
  mode: 'work' | 'shortBreak' | 'longBreak';
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessions: number;
  totalSessions: number;
  autoStartBreaks: boolean;
  autoStartFocusSessions: boolean;
  currentTask: string;
};

type FocusActions = {
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipTimer: () => void;
  setWorkDuration: (duration: number) => void;
  setShortBreakDuration: (duration: number) => void;
  setLongBreakDuration: (duration: number) => void;
  setAutoStartBreaks: (autoStart: boolean) => void;
  setAutoStartFocusSessions: (autoStart: boolean) => void;
  setCurrentTask: (task: string) => void;
};

const FocusContext = createContext<{ state: FocusState; actions: FocusActions } | undefined>(
  undefined,
);

export const useFocusContext = () => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error('useFocusContext must be used within a FocusProvider');
  }
  return context;
};

export function FocusProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<FocusState>({
    currentTime: 25 * 60,
    isActive: false,
    isPaused: false,
    mode: 'work',
    workDuration: 25 * 60,
    shortBreakDuration: 5 * 60,
    longBreakDuration: 15 * 60,
    sessions: 0,
    totalSessions: 4,
    autoStartBreaks: true,
    autoStartFocusSessions: true,
    currentTask: '',
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (state.isActive && !state.isPaused) {
      intervalRef.current = setInterval(() => {
        setState((prev) => {
          if (prev.currentTime > 0) {
            return { ...prev, currentTime: prev.currentTime - 1 };
          } else {
            clearInterval(intervalRef.current!);
            return { ...prev, isActive: false };
          }
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.isActive, state.isPaused]);

  // --- ALERT SOUND AND NOTIFICATION ---
  const playAlertSound = () => {
    try {
      const audio = new Audio('/focus-done.mp3');
      audio.play();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  useEffect(() => {
    // When timer finishes (work mode), play sound and show notification
    const showNotification = () => {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        if (Notification.permission === 'granted') {
          new Notification('Focus Flex', {
            body:
              state.mode === 'work'
                ? `You've completed a focus session${state.currentTask ? ` on \"${state.currentTask}\"` : ''}!`
                : 'Time to get back to work!',
            icon: '/favicon.ico',
          });
        }
      }
    };
    if (!state.isActive && state.currentTime === 0 && state.mode === 'work') {
      playAlertSound();
      showNotification();
    }
  }, [state.isActive, state.currentTime, state.mode, state.currentTask]);

  const actions: FocusActions = {
    startTimer: () => setState((prev) => ({ ...prev, isActive: true, isPaused: false })),
    pauseTimer: () => setState((prev) => ({ ...prev, isPaused: true })),
    resetTimer: () =>
      setState((prev) => ({
        ...prev,
        currentTime: prev.workDuration,
        isActive: false,
        isPaused: false,
      })),
    skipTimer: () =>
      setState((prev) => ({
        ...prev,
        mode: prev.mode === 'work' ? 'shortBreak' : 'work',
        currentTime: prev.mode === 'work' ? prev.shortBreakDuration : prev.workDuration,
      })),
    setWorkDuration: (duration) => setState((prev) => ({ ...prev, workDuration: duration })),
    setShortBreakDuration: (duration) =>
      setState((prev) => ({ ...prev, shortBreakDuration: duration })),
    setLongBreakDuration: (duration) =>
      setState((prev) => ({ ...prev, longBreakDuration: duration })),
    setAutoStartBreaks: (autoStart) =>
      setState((prev) => ({ ...prev, autoStartBreaks: autoStart })),
    setAutoStartFocusSessions: (autoStart) =>
      setState((prev) => ({ ...prev, autoStartFocusSessions: autoStart })),
    setCurrentTask: (task) => setState((prev) => ({ ...prev, currentTask: task })),
  };

  return <FocusContext.Provider value={{ state, actions }}>{children}</FocusContext.Provider>;
}
