import React from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Text, View } from './Themed';
import { Habit } from '@/lib/types/habit';
import { AntDesign } from '@expo/vector-icons';

interface HabitItemProps {
  habit: Habit;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function HabitItem({ habit, onComplete, onDelete }: HabitItemProps) {
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.rightActions}>
        <Animated.View style={[styles.actionButton, styles.deleteButton, { transform: [{ scale }] }]}>
          <TouchableOpacity onPress={() => onDelete(habit.id)} style={styles.actionContent}>
            <AntDesign name="delete" size={20} color="white" />
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.actionButton, styles.completeButton, { transform: [{ scale }] }]}>
          <TouchableOpacity onPress={() => onComplete(habit.id)} style={styles.actionContent}>
            <AntDesign name="check" size={20} color="white" />
            <Text style={styles.actionText}>Complete</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>
        <Text style={styles.emoji}>{habit.emoji}</Text>
        <View style={styles.content}>
          <Text style={styles.title}>{habit.title}</Text>
          <Text style={styles.description}>{habit.description}</Text>
          <Text style={styles.frequency}>
            {habit.frequency.times}x {habit.frequency.type}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  emoji: {
    fontSize: 30,
    marginRight: 15,
  },
  content: {
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
  frequency: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
  },
  actionContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 4,
  },
});