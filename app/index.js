import React from "react";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthProvider, useAuth } from "./src/context/UserContext"; // Ensure correct import
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CustomChecklistScreen from "./src/screens/CustomChecklistScreen";
import DailyChecklistScreen from "./src/screens/DailyChecklistScreen";
import MeditationScreen from "./src/screens/MeditationScreen";
import PeacefulSoundsScreen from "./src/screens/PeacefulSoundsScreen";
import SentimentAnalysisScreen from "./src/screens/SentimentAnalysisScreen";
import TodaysSessionScreen from "./src/screens/TodaysSessionScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { Toaster } from "sonner-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeMain"
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
            <MaterialCommunityIcons name="yoga" color={color} size={size} />
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
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="DailyChecklistScreen" component={DailyChecklistScreen} />
      <Stack.Screen name="CustomChecklistScreen" component={CustomChecklistScreen} />
      <Stack.Screen name="MeditationScreen" component={MeditationScreen} />
      <Stack.Screen name="PeacefulSoundsScreen" component={PeacefulSoundsScreen} />
      <Stack.Screen name="SentimentAnalysisScreen" component={SentimentAnalysisScreen} />
    </Stack.Navigator>
  );
}

function TodaysSessionStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TodaysSessionMain" component={TodaysSessionScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

// Main App Content with Auth Logic
function AppContent() {
  const { authState } = useAuth();
  console.log("NavigationContainer rendered"); // Debugging
  
  return (
    <NavigationIndependentTree>
    <NavigationContainer>
      {authState.user ? <TabNavigator /> : <AuthStack />}
      <Toaster position="top-center" duration={3000} theme="system" />
    </NavigationContainer>
    </NavigationIndependentTree>
  );
}

// Wrap with AuthProvider
const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
