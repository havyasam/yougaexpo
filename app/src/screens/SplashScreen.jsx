import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../context/UserContext';

const SplashScreen = () => {
  // const [fontsLoaded] = useFonts({
  //   'SAMAN__': require('./assets/fonts/SAMAN__.TTF'),
  //   'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  // });
  const navigation = useNavigation();
  const { user } = useUserContext(); // Access user context

  useEffect(() => {
    // If the user is logged in, navigate to the Home screen
    setTimeout(() => {
      if (user) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login'); // Navigate to Login if no user
      }
    }, 2000); // Splash screen duration
  }, [user, navigation]);

  return (
    <View style={styles.container}>
      <Text style={{fontFamily:'italic'}}>The yoga life</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00f',
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontFamily:'Inter-Black'
  },
});

export default SplashScreen;
