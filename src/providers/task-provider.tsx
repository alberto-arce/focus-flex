'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  focusCount: number;
  estimatedFocusSessions: number;
  createdAt: Date;
};

type TaskContextType = {
  tasks: Task[];
  activeTaskId: string | null;
  addTask: (title: string, estimatedFocusSessions?: number) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id'>>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  setActiveTask: (id: string | null) => void;
  incrementFocusCount: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem('focus-tasks');
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
        }));
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error parsing stored tasks:', error);
      }
    }

    const storedActiveTaskId = localStorage.getItem('focus-active-task');
    if (storedActiveTaskId) {
      setActiveTaskId(storedActiveTaskId);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('focus-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Save active task to localStorage
  useEffect(() => {
    if (activeTaskId) {
      localStorage.setItem('focus-active-task', activeTaskId);
    } else {
      localStorage.removeItem('focus-active-task');
    }
  }, [activeTaskId]);

  const addTask = (title: string, estimatedFocusSessions: number = 1) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      focusCount: 0,
      estimatedFocusSessions,
      createdAt: new Date(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // If no active task, set this as active
    if (!activeTaskId) {
      setActiveTaskId(newTask.id);
    }
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id'>>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    // If deleting the active task, clear active task
    if (activeTaskId === id) {
      setActiveTaskId(null);
    }
  };

  const completeTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed: true } : task)),
    );

    // If completing the active task, clear active task
    if (activeTaskId === id) {
      setActiveTaskId(null);
    }
  };

  const setActiveTask = (id: string | null) => {
    setActiveTaskId(id);
  };

  const incrementFocusCount = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, focusCount: task.focusCount + 1 } : task,
      ),
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        activeTaskId,
        addTask,
        updateTask,
        deleteTask,
        completeTask,
        setActiveTask,
        incrementFocusCount,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
