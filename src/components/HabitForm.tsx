import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import { FrequencyType, Habit } from '@/lib/types/habit';

interface HabitFormProps {
  onSubmit: (habit: Omit<Habit, 'id' | 'completed' | 'createdAt'>) => void;
  onCancel: () => void;
}

export default function HabitForm({ onSubmit, onCancel }: HabitFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [emoji, setEmoji] = useState('');
  const [frequency, setFrequency] = useState({
    type: 'daily' as FrequencyType,
    times: 1,
  });

  const handleSubmit = () => {
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      emoji: emoji.trim() || '📝',
      frequency,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Habit</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      
      <TextInput
        style={styles.input}
        placeholder="Emoji"
        value={emoji}
        onChangeText={setEmoji}
      />
      
      <View style={styles.frequencyContainer}>
        <TextInput
          style={styles.numberInput}
          placeholder="Times"
          value={frequency.times.toString()}
          onChangeText={(text) => setFrequency({ ...frequency, times: parseInt(text) || 1 })}
          keyboardType="numeric"
        />
        
        <View style={styles.buttonGroup}>
          {(['daily', 'weekly', 'monthly'] as FrequencyType[]).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.frequencyButton,
                frequency.type === type && styles.frequencyButtonActive,
              ]}
              onPress={() => setFrequency({ ...frequency, type })}
            >
              <Text style={frequency.type === type ? styles.buttonTextActive : styles.buttonText}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonTextActive}>Create Habit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  frequencyContainer: {
    marginBottom: 20,
  },
  numberInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
    width: '30%',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  frequencyButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  frequencyButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  submitButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    color: '#666',
  },
  buttonTextActive: {
    fontSize: 16,
    color: '#fff',
  },
});