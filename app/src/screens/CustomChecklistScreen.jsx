// CustomChecklistScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { getAsyncItem, saveAsyncItem, removeAsyncItem } from '../utils/asyncStorageService';

export default function CustomChecklistScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Load tasks from AsyncStorage when the component mounts
  useEffect(() => {
    const loadCustomTasks = async () => {
      const customTasks = await getAsyncItem('tasks'); // Use helper to get tasks
      if (customTasks) {
        setTasks(customTasks);
      }
    };

    loadCustomTasks();
  }, []);

  // Add a new task
  const addTask = async () => {
    if (newTask.trim() === '' || tasks.length >= 3) return; // Prevent empty or more than 3 tasks

    const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    const newTaskObject = { id: newId, title: newTask };

    const updatedTasks = [...tasks, newTaskObject];
    setTasks(updatedTasks);
    setNewTask('');
    await saveAsyncItem('tasks', updatedTasks); // Save updated tasks to AsyncStorage
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    await saveAsyncItem('tasks', updatedTasks); // Save updated tasks to AsyncStorage
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Create Your Own Checklist</Text>
      <Text style={styles.info}>Max allowed is 3</Text>

      <TextInput
        style={styles.input}
        placeholder="New one..."
        value={newTask}
        onChangeText={setNewTask}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>

      <View style={styles.gap} />

      {tasks.map((task) => (
        <View key={task.id} style={styles.task}>
          <Text style={styles.taskText}>{task.title}</Text>
          <TouchableOpacity onPress={() => deleteTask(task.id)}>
            <Text style={styles.deleteText}>❌</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity onPress={() => navigation.navigate('DailyChecklistScreen')}>
        <Text style={styles.linkText}>↩️ Go to Daily Checklist</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  info: { marginBottom: 10, color: '#555' },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 },
  addButton: { backgroundColor: '#f9e08b', padding: 10, borderRadius: 5 },
  addButtonText: { textAlign: 'center', fontWeight: 'bold' },
  gap: { marginBottom: 20 },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  taskText: { fontSize: 18 },
  deleteText: { color: 'red' },
  linkText: { color: '#4A90E2', marginTop: 25 },
});
