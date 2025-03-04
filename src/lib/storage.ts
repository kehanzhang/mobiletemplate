import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit, HabitCompletion } from './types/habit';

const HABITS_KEY = '@habits';
const COMPLETIONS_KEY = '@habit_completions';

export const storage = {
  async getHabits(): Promise<Habit[]> {
    try {
      const data = await AsyncStorage.getItem(HABITS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting habits:', error);
      return [];
    }
  },

  async saveHabits(habits: Habit[]): Promise<void> {
    try {
      await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(habits));
    } catch (error) {
      console.error('Error saving habits:', error);
    }
  },

  async getCompletions(): Promise<HabitCompletion[]> {
    try {
      const data = await AsyncStorage.getItem(COMPLETIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting completions:', error);
      return [];
    }
  },

  async saveCompletions(completions: HabitCompletion[]): Promise<void> {
    try {
      await AsyncStorage.setItem(COMPLETIONS_KEY, JSON.stringify(completions));
    } catch (error) {
      console.error('Error saving completions:', error);
    }
  },

  async addHabit(habit: Habit): Promise<void> {
    const habits = await this.getHabits();
    habits.push(habit);
    await this.saveHabits(habits);
  },

  async updateHabit(updatedHabit: Habit): Promise<void> {
    const habits = await this.getHabits();
    const index = habits.findIndex(h => h.id === updatedHabit.id);
    if (index !== -1) {
      habits[index] = updatedHabit;
      await this.saveHabits(habits);
    }
  },

  async deleteHabit(habitId: string): Promise<void> {
    const habits = await this.getHabits();
    const filtered = habits.filter(h => h.id !== habitId);
    await this.saveHabits(filtered);
  },

  async completeHabit(habitId: string): Promise<void> {
    const habits = await this.getHabits();
    const habit = habits.find(h => h.id === habitId);
    if (habit) {
      const completion: HabitCompletion = {
        id: Math.random().toString(36).substring(7),
        habitId,
        completedAt: new Date().toISOString(),
      };
      const completions = await this.getCompletions();
      completions.push(completion);
      await this.saveCompletions(completions);
    }
  }
};