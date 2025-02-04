import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/UserContext';

const SplashScreen = () => {
  const navigation = useNavigation();
  const { authState } = useAuth(); // Access user authentication state

  useEffect(() => {
    const timer = setTimeout(() => {
      if (authState.user) {
        navigation.replace('HomeMain'); // Ensure this matches your navigation structure
      } else {
        navigation.replace('Signup'); // Redirect to Signup/Login if user not authenticated
      }
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timeout
  }, [authState.user, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>The Yoga Life</Text>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontStyle: 'italic',
    marginBottom: 10,
  },
});

export default SplashScreen;
