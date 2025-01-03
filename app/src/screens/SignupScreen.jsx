import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const SignupScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [nationality, setNationality] = useState('India');
  const [flexibility, setFlexibility] = useState('flexible');
  const navigation = useNavigation();

  // Function to request OTP
  const handleGetOtp = async () => {
    try {
      const response = await axios.post(
        'https://youga-server.onrender.com/api/routes/v1/registration/request-otp',
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        setIsOtpVisible(true); // Show OTP field
        Alert.alert('OTP Sent', 'An OTP has been sent to your email.');
      } else {
        Alert.alert('Error', 'Email not registered.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error(error);
    }
  };

  // Function to verify OTP
  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post(
        'https://youga-server.onrender.com/api/routes/v1/registration/verify-otp',
        {
          email: email,
          name: fullName,
          otp: otp,
          flexibilityLevel: flexibility,
          country: nationality
          
        }
      );
     
      if (response.status === 201) {
        const { token } = response.data;
       
        Alert.alert('Success', 'OTP verified successfully!');
        console.log()
        navigation.navigate('Home');
      } else {
        
        Alert.alert('Error', 'OTP verification failed.');
      }
    } catch (error) {
      
      Alert.alert('Error', 'Something went wrong while verifying OTP.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Namaste</Text>

      {/* Full Name */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      {/* Level of Flexibility */}
      <Text style={styles.label}>Level of Flexibility</Text>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[styles.checkbox, flexibility === 'Easy' && styles.checkboxSelected]}
          onPress={() => setFlexibility('Easy')}
        >
          <Text style={styles.checkboxText}>I have limited Flexibility due to an injury</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.checkbox, flexibility === 'flexible' && styles.checkboxSelected]}
          onPress={() => setFlexibility('flexible')}
        >
          <Text style={styles.checkboxText}>flexible</Text>
        </TouchableOpacity>
      </View>

      {/* Email */}
      <Text style={styles.label}>Personal Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Nationality */}
      <Text style={styles.label}>Nationality</Text>
      <Picker
        selectedValue={nationality}
        style={styles.input}
        onValueChange={(itemValue) => setNationality(itemValue)}
      >
        <Picker.Item label="India" value="India" />
        <Picker.Item label="USA" value="USA" />
      </Picker>

      {/* Get OTP */}
      <TouchableOpacity style={styles.customButton} onPress={handleGetOtp}>
        <Text style={styles.customButtonText}>Get OTP</Text>
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
          <TouchableOpacity style={styles.customButton} onPress={handleOtpSubmit}>
            <Text style={styles.customButtonText}>Submit OTP</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
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
  checkboxContainer: {
    width: '100%',
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxSelected: {
    backgroundColor: '#D1E7FF',
  },
  checkboxText: {
    fontSize: 16,
  },
  otpContainer: {
    marginTop: 20,
    width: '100%',
  },
  customButton: {
    backgroundColor: 'rgb(242, 159, 88)',
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 5,
  },
  customButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SignupScreen;
