import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const navigation = useNavigation();

  const handleGetOtp = async () => {
    try {
      const response = await fetch(
        'https://youga-server.onrender.com/api/routes/v1/login/request-otp', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setIsOtpVisible(true);
        Alert.alert('OTP Sent', 'An OTP has been sent to your email.');
      } else {
        const error = await response.json();
        Alert.alert('Error', error.message || 'Failed to send OTP.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error(error);
    }
  };

  
  const handleOtpSubmit = async () => {
    try {
      const response = await fetch(
        'https://youga-server.onrender.com/api/routes/v1/login/verify-otp', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

      
         await SecureStore.setItemAsync('jwt_token', token);

        Alert.alert('Success', 'Login successful!');
        navigation.replace('Home');
      } else {
        const error = await response.json();
        Alert.alert('Error', error.message || 'Invalid OTP.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} class = ''>Welcome Back</Text>
      
      {/* Email Input */}
      <Text style={styles.label}>Registered Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Get OTP Button */}
      <TouchableOpacity style={styles.button} onPress={handleGetOtp}>
        <Text style={styles.buttonText}>Get OTP</Text>
      </TouchableOpacity>

      {/* OTP Input */}
      {isOtpVisible && (
        <View style={styles.otpContainer}>
          <Text style={styles.label}>Enter OTP</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
            maxLength={6}
          />
          <TouchableOpacity style={styles.button} onPress={handleOtpSubmit}>
            <Text style={styles.buttonText}>Submit OTP</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Signup Redirect */}
      <Text style={styles.signupText}>Don't have an account yet?</Text>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.signupButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 100,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgb(242, 159, 88)',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  otpContainer: {
    marginTop: 20,
  },
  signupText: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
  },
  signupButton: {
    backgroundColor: 'rgb(88, 159, 242)',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  signupButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
