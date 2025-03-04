import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Habit } from '@/lib/types/habit';
import { storage } from '@/lib/storage';
import HabitItem from '@/components/HabitItem';
import { Link } from 'expo-router';

export default function HabitsScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    const loadedHabits = await storage.getHabits();
    setHabits(loadedHabits.filter(h => !h.completed));
  };

  const handleComplete = async (id: string) => {
    await storage.completeHabit(id);
    const habit = habits.find(h => h.id === id);
    if (habit) {
      const updatedHabit = {
        ...habit,
        completed: true,
        completedAt: new Date().toISOString(),
      };
      await storage.updateHabit(updatedHabit);
      await loadHabits();
    }
  };

  const handleDelete = async (id: string) => {
    await storage.deleteHabit(id);
    await loadHabits();
  };

  if (habits.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No habits yet!</Text>
        <Link href="/modal" asChild>
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>Create your first habit</Text>
          </TouchableOpacity>
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitItem
            habit={item}
            onComplete={handleComplete}
            onDelete={handleDelete}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
