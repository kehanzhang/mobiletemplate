import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Habit } from '@/lib/types/habit';
import { storage } from '@/lib/storage';

interface CompletedHabit extends Habit {
  completedAt: string;
}

export default function HistoryScreen() {
  const [completedHabits, setCompletedHabits] = useState<CompletedHabit[]>([]);

  useEffect(() => {
    loadCompletedHabits();
  }, []);

  const loadCompletedHabits = async () => {
    const habits = await storage.getHabits();
    const completed = habits
      .filter((h): h is CompletedHabit => h.completed && h.completedAt !== undefined)
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
    setCompletedHabits(completed);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (completedHabits.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No completed habits yet!</Text>
        <Text style={styles.subText}>Complete some habits to see them here.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={completedHabits}
        keyExtractor={(item) => `${item.id}-${item.completedAt}`}
        renderItem={({ item }) => (
          <View style={styles.habitItem}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <View style={styles.habitInfo}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.completedDate}>
                Completed on {formatDate(item.completedAt)}
              </Text>
            </View>
          </View>
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
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  habitItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  emoji: {
    fontSize: 30,
    marginRight: 15,
  },
  habitInfo: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  completedDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});
