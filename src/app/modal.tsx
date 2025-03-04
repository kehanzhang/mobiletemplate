import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { Text, View } from '@/components/Themed';
import HabitForm from '@/components/HabitForm';
import { storage } from '@/lib/storage';
import { router } from 'expo-router';

export default function ModalScreen() {
  const handleSubmit = async (habitData: any) => {
    const newHabit = {
      ...habitData,
      id: Math.random().toString(36).substring(7),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    await storage.addHabit(newHabit);
    router.back();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <HabitForm onSubmit={handleSubmit} onCancel={() => router.back()} />
    </View>
  );
}
