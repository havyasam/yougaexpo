import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store'; // For secure storage

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ user: null, token: null });

  // Check for existing auth data when the component mounts
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        // Retrieve the token from secure storage
        const token = await SecureStore.getItemAsync('auth_token');
        // Retrieve the user data from secure storage
        const userStr = await SecureStore.getItemAsync('user');

        if (token && userStr) {
          const user = JSON.parse(userStr);
          setAuthState({ token, user });
        }
      } catch (error) {
        console.error('Error loading auth data:', error);
      }
    };

    loadAuthData();
  }, []);

  // Login function
  const login = async (token, user) => {
    try {
      // Save the token securely
      await SecureStore.setItemAsync('auth_token', token);
      // Save the user data securely
      await SecureStore.setItemAsync('user', JSON.stringify(user));
      // Update the auth state
      setAuthState({ token, user });
    } catch (error) {
      console.error('Error saving auth data:', error);
    }
  };

  // Signup function (similar to login, but you can add additional logic if needed)
  const signup = async (token, user) => {
    try {
      // Save the token securely
      await SecureStore.setItemAsync('auth_token', token);
      // Save the user data securely
      await SecureStore.setItemAsync('user', JSON.stringify(user));
      // Update the auth state
      setAuthState({ token, user });
    } catch (error) {
      console.error('Error saving auth data:', error);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Remove the token from secure storage
      await SecureStore.deleteItemAsync('auth_token');
      // Remove the user data from secure storage
      await SecureStore.deleteItemAsync('user');
      // Reset the auth state
      setAuthState({ token: null, user: null });
    } catch (error) {
      console.error('Error removing auth data:', error);
    }
  };

  // Provide the auth state and methods to the children
  return (
    <AuthContext.Provider value={{ authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};