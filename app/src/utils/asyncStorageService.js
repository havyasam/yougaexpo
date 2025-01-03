import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to get an item from AsyncStorage
export const getAsyncItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null; // Return parsed value or null if not found
  } catch (error) {
    console.error('Error getting AsyncStorage item', error);
  }
};

// Function to save an item to AsyncStorage
export const saveAsyncItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value)); // Save as a JSON string
  } catch (error) {
    console.error('Error saving AsyncStorage item', error);
  }
};

// Function to remove an item from AsyncStorage
export const removeAsyncItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key); // Remove item by key
  } catch (error) {
    console.error('Error removing AsyncStorage item', error);
  }
};

// Function to get tasks from AsyncStorage
export const getTasks = async () => {
  return await getAsyncItem('tasks'); // Retrieve tasks from AsyncStorage
};

// Function to save tasks to AsyncStorage
export const saveTasks = async (tasks) => {
  await saveAsyncItem('tasks', tasks); // Save tasks to AsyncStorage
};

// Function to get the streak count from AsyncStorage
export const getStreak = async () => {
  return await getAsyncItem('streak'); // Retrieve streak count from AsyncStorage
};

// Function to save the streak count to AsyncStorage
export const saveStreak = async (streakCount) => {
  await saveAsyncItem('streak', streakCount); // Save streak count to AsyncStorage
};
