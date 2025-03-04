export type FrequencyType = 'daily' | 'weekly' | 'monthly';

export interface Habit {
  id: string;
  title: string;
  description: string;
  emoji: string;
  frequency: {
    type: FrequencyType;
    times: number;
  };
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

export interface HabitCompletion {
  id: string;
  habitId: string;
  completedAt: string;
}