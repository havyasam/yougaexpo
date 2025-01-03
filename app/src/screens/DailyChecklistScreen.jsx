// DailyChecklistScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getTasks, saveTasks, getStreak, saveStreak } from '../utils/asyncStorageService'; // Import helper functions

export default function DailyChecklistScreen() {
  const [tasks, setTasks] = useState([]);
  const [streakCount, setStreakCount] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const loadInitialData = async () => {
      // Load or initialize streak
      let streak = await getStreak();
      if (!streak) {
        streak = { count: 0 };
        await saveStreak(streak);
      }
      setStreakCount(streak.count);

      // Load or initialize tasks
      let storedTasks = await getTasks();
      if (!storedTasks || storedTasks.length === 0) {
        const initialTasks = [
          { id: 1, title: 'Slept at least for 7 hours', completed: false },
          { id: 2, title: 'Drank around 3 litres of water', completed: false },
          { id: 3, title: 'Exercised for at least 20 mins', completed: false },
          { id: 4, title: "Completed Yoga's Daily Yoga session", completed: false },
          { id: 5, title: 'Think of something you are grateful for', completed: false },
        ];
        await saveTasks(initialTasks);
        storedTasks = initialTasks;
      }
      setTasks(storedTasks);
    };

    loadInitialData();
  }, []);

  const handleTaskClick = async (taskId) => {
    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex((task) => task.id === taskId);

    updatedTasks[taskIndex].completed = !updatedTasks[taskIndex].completed;
    await saveTasks(updatedTasks);

    setTasks(updatedTasks);

    const completedCount = updatedTasks.filter((task) => task.completed).length;
    if (completedCount >= 4) {
      const streak = await getStreak();
      streak.count += 1;
      await saveStreak(streak);
      setStreakCount(streak.count);
    }
  };

  const currentDate = new Date().toLocaleDateString('en-GB');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Perfect Daily Checklist</Text>
        <Text style={styles.streakCount}>🔥 Streak Count: {streakCount}</Text>
      </View>

      <Text style={styles.infoText}>
        Do the basics. Get massive results. {'\n'}
        Check 4 out of 5 tasks to consider for streaks. {'\n'}
        Click to mark as completed to get Streaks.
      </Text>

      <Text style={styles.dateText}>Date: {currentDate}</Text>

      {tasks.map((task) => (
        <TouchableOpacity
          key={task.id}
          style={[styles.task, task.completed ? styles.completed : styles.pending]}
          onPress={() => handleTaskClick(task.id)}
        >
          <Text style={styles.taskText}>{task.title}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity onPress={() => navigation.navigate('CustomChecklistScreen')}>
        <Text style={styles.linkText}>Create Custom Checklist →</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        Note: We respect your privacy and only count today's completed tasks for streaks, and delete the data afterward.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f8f9fa' },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  header: { fontSize: 22, fontWeight: 'bold' },
  streakCount: { fontSize: 18, fontWeight: 'bold', color: '#ff6347' },
  infoText: { fontSize: 16, fontWeight: '500', color: '#333', marginTop: 20, marginBottom: 20 },
  dateText: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  task: { padding: 15, marginVertical: 5, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  completed: { backgroundColor: '#c8f7c5' },
  pending: { backgroundColor: '#f7c5c5' },
  taskText: { fontSize: 16 },
  linkText: { color: '#007bff', fontSize: 18, fontWeight: '600', marginTop: 20, textAlign: 'center' },
  note: { marginTop: 20, fontSize: 14, color: '#888', textAlign: 'center' },
});
