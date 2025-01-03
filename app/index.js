import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserProvider } from './src/context/UserContext'; // Import UserProvider
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignupScreen from './src/screens/SignupScreen';
import CustomChecklistScreen from './src/screens/CustomChecklistScreen'
import DailyChecklistScreen from './src/screens/DailyChecklistScreen'
import MeditationScreen from './src/screens/MeditationScreen'
import PeacefulSoundsScreen from './src/screens/PeacefulSoundsScreen'
import SentimentAnalysisScreen from './src/screens/SentimentAnalysisScreen'
import TodaysSessionScreen from './src/screens/TodaysSessionScreen'
import ProfileScreen from './src/screens/ProfileScreen'

import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';



function HomeStack() {
  return (
    <UserProvider>

    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="DailyChecklistScreen" component={DailyChecklistScreen} />
      <Stack.Screen name="CustomChecklistScreen" component={CustomChecklistScreen} />
      <Stack.Screen name="MeditationScreen" component={MeditationScreen} />
      <Stack.Screen name="PeacefulSoundsScreen" component={PeacefulSoundsScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="TodaysSessionScreen" component={TodaysSessionScreen} />
      <Stack.Screen name="SentimentAnalysisScreen" component={SentimentAnalysisScreen} />
    </Stack.Navigator>
    </UserProvider>

  );
}

function TodaysSessionStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TodaysSessionMain" component={TodaysSessionScreen} />
    </Stack.Navigator>
  );
}

// Profile Stack
function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const App = () => {
  return (
    

    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Today's Yoga Session"
        component={TodaysSessionStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="yoga" color={color} size={size} /> // Use a yoga-related icon
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
   
  );
};

export default App;
